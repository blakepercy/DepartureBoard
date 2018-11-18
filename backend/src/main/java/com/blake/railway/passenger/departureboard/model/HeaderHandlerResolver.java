package com.blake.railway.passenger.departureboard.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.ws.handler.Handler;
import javax.xml.ws.handler.HandlerResolver;
import javax.xml.ws.handler.PortInfo;

import com.thalesgroup.rtti._2013_11_28.token.types.AccessToken;

public class HeaderHandlerResolver implements HandlerResolver
{

    private AccessToken token;

    public HeaderHandlerResolver(AccessToken token) {
        this.token = token;
    }

    public List<Handler> getHandlerChain(PortInfo portInfo) {
        List<Handler> handlerChain = new ArrayList<>();
        HeaderHandler headerHandler = new HeaderHandler(token);
        handlerChain.add(headerHandler);
        return handlerChain;
    }
}