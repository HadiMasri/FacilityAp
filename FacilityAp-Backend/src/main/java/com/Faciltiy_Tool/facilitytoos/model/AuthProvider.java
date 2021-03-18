package com.Faciltiy_Tool.facilitytoos.model;

import com.microsoft.graph.authentication.IAuthenticationProvider;
import com.microsoft.graph.http.IHttpRequest;

public enum AuthProvider implements IAuthenticationProvider {
    azure,
    local;

    @Override
    public void authenticateRequest(IHttpRequest iHttpRequest) {

    }
}
