from rest_framework import response
from django.http import HttpResponse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from payments.models import PaymentHistory
from rest_framework import viewsets, permissions
from .serializer import DoctorsSerializer, DocReviewSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from .models import Doctors, DocReview
from django.http import JsonResponse
from agora_token_builder import RtcTokenBuilder
import stripe
import random
import time
from django.db.models import Prefetch

stripe.api_key = settings.STRIPE_SECRET_KEY
API_URL = "http://127.0.0.1:8000"

class DocReviewCreation(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DocReviewSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DoctorsView(viewsets.ModelViewSet):
    serializer_class = DoctorsSerializer
    queryset = Doctors.objects.all().prefetch_related('docreview_set')


class ReviewCreation(CreateAPIView):
    serializer_class = DocReviewSerializer
    queryset = DocReview.objects.all()

def getToken(request):
    appId = "84cd947b94c744deaca5575946294f1f"
    appCertificate = "2b62c153a4024efeb7ef52e8df165790"
    channelName = request.GET.get('channel')
    uid = random.randint(1,230)
    expirationTimeInSeconds = 3600*24
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1

    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token': token, 'uid': uid}, safe=False)



class CreateCheckOutSession(APIView):
    def post(self, request, *args, **kwargs):
        doc_id = self.kwargs["pk"]
        try:
            doctor = Doctors.objects.get(id=doc_id)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'unit_amount': int(doctor.price) * 100,
                            'product_data': {
                                'name': doctor.first_name,
                                'images': [doctor.image]
                            }
                        },
                        'quantity': 1,
                    },
                ],
                metadata={
                    "product_id": doctor.id
                },
                mode='payment',
                success_url=settings.SITE_URL + '?success=true',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )

            # Return checkout session URL in the response
            return Response({'checkout_url': checkout_session.url})

        except Exception as e:
            return Response({'msg': 'something went wrong while creating stripe session', 'error': str(e)}, status=500)
@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_SECRET_WEBHOOK
        )
    except ValueError as e:
        # Invalid payload
        return Response(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return Response(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        print(session)
        customer_email = session['customer_details']['email']
        doc_id = session['metadata']['product_id']
        doctor = Doctors.objects.get(id=doc_id)
        # sending confimation mail
        send_mail(
            subject="payment sucessful",
            message=f"thank for your purchase your order is ready.  download url {doctor.book_url}",
            recipient_list=[customer_email],
            from_email="FarrukhT26@gmail.com"
        )

        # creating payment history
        # user=User.objects.get(email=customer_email) or None

        PaymentHistory.objects.create(product=doctor, payment_status=True)
    # Passed signature verification
    return HttpResponse(status=200)