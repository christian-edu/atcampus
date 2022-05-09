package no.kristiania.server;

import jakarta.servlet.*;

import java.io.IOException;

public class PetStoreFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("Before");
        filterChain.doFilter(servletRequest, servletResponse);
        System.out.println("After");
    }
}
