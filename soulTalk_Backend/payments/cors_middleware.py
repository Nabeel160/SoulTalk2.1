# cors_middleware.py

class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Allow requests from http://127.0.0.1:3000
        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
        # Add other CORS headers if needed
        return response
