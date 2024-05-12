from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from channels.routing import ProtocolTypeRouter
from doctors.views import DoctorsView, getToken, DocReviewCreation
from user.views import UserViewSet, UserRegister, UserLogin, UserLogout, UserView, AddFavorite, RemoveFavorite, UpdateProfile
from review.views import ReviewsView, ReviewCreation
from forums.views import PostView, PostCreation, ReplyCreation
from doctors.views import CreateCheckOutSession, stripe_webhook_view
from chatroom.views import MessageView




from doctors import views
#from chatroom import views as cv


router = routers.DefaultRouter()
router.register(r'doctors', DoctorsView, 'doctors')
router.register(r'user', UserViewSet, 'user')
router.register(r'reviews', ReviewsView, 'reviews')
router.register(r'forums', PostView, 'post')
router.register(r'messages', MessageView, 'messages')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', UserRegister.as_view(), name='register'),
    path('api/login/', UserLogin.as_view(), name='login'),
    path('api/logout/', UserLogout.as_view(), name='logout'),
    path('api/userview/', UserView.as_view(), name='userview'),
    path('api/add_favorite/', AddFavorite.as_view(), name='addFavorite'),
    path('api/remove_favorite/', RemoveFavorite.as_view(), name='removeFavorite'),
    path('get_token/', views.getToken),
    path('api/submit_review/', ReviewCreation.as_view()),
    path('api/submit_docReview/', DocReviewCreation.as_view()),
    path('api/submit_thread/', PostCreation.as_view()),
    path('api/submit_reply/', ReplyCreation.as_view()),
    #path('api/chatroom/send_message/<str:room_name>/', cv.send_message, name='send_message'),
    #path('api/chatroom/get_messages/<str:room_name>/', cv.get_messages, name='get_messages'),
    path('api/payments/', include('payments.urls')),
    path('api/doctors/stripe-webhook/', stripe_webhook_view, name='stripe-webhook'),
    path('api/doctors/create-checkout-session/<pk>/', CreateCheckOutSession.as_view(), name="checkoutSession"),
    path('reset_password/',auth_views.PasswordResetView.as_view(),name="reset_password"),
  path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(),name="password_reset_done"),
   path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(),name="password_reset_cofirm"),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(),name="password_reset_complete"),
    path('api/update_profile/', UpdateProfile.as_view(), name="updateProfile")
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




admin.site.site_header = 'Soul Talk Administration'
admin.site.site_title = 'Soul Talk'
admin.site.site_url = 'http://127.0.0.1:3000'