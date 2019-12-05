
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response


class DiscardSessionForAPIMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith("/api/user/sessions/all/delete/"): # Or any other condition
            
            return Response({"details":"Successfully deleted all existing sessions!"})