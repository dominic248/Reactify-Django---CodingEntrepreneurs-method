
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response


class AddHeadersAPIMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if isinstance(response, Response):
            # response.data['detail'] = 'I have been edited'
            print(dir(response))
            response['Access-Control-Allow-Credentials'] = True
            response['Access-Control-Allow-Origin'] = "*"
            response['Access-Control-Allow-Headers'] = "*"
            # you need to change private attribute `_is_render` 
            # to call render second time
            response._is_rendered = False 
            response.render()  
        print("Request: ",request.headers)
        print("Response: ",response._headers)
        print("hi")
        return response