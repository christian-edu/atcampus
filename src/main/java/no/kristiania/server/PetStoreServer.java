package no.kristiania.server;

import jakarta.servlet.DispatcherType;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.webapp.WebAppContext;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.EnumSet;

public class PetStoreServer {
    
    private final Server server = new Server(8080);

    public static void main(String[] args) throws Exception {
        new PetStoreServer().start();
    }

    private void start() throws Exception {
        HandlerList handler = new HandlerList();
        Resource resource = Resource.newClassPathResource("/webapp-test");
        WebAppContext webAppContext = new WebAppContext(resource, "/foo");
        if (Files.exists(Path.of("src/main/resources/webapp-test"))) {
            webAppContext.setBaseResource(Resource.newResource(Path.of("src/main/resources/webapp-test")));
            webAppContext.getInitParams().put("org.eclipse.jetty.servlet.Default.useFileMappedBuffer", "false");
        }
        webAppContext.addFilter(new FilterHolder(new PetStoreFilter()), "/*", EnumSet.of(DispatcherType.REQUEST));
        webAppContext.addServlet(new ServletHolder(new ApiServlet()), "/api/*");

        handler.addHandler(webAppContext);
        server.setHandler(handler);
        server.start();
    }
}
