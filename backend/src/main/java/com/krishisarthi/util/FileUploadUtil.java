package com.krishisarthi.util;

import com.krishisarthi.config.ApplicationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Component
public class FileUploadUtil {

    private final Path rootLocation;

    public FileUploadUtil(ApplicationProperties properties) {
        this.rootLocation = Paths.get(properties.getStorage().getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage directory", e);
        }
    }

    public String saveFile(MultipartFile file, String subFolder) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        Path targetDir = this.rootLocation.resolve(subFolder);
        Files.createDirectories(targetDir);

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
        } else {
            extension = ".jpg";
        }

        String uniqueFilename = UUID.randomUUID().toString().replace("-", "") + extension;
        Path destinationFile = targetDir.resolve(uniqueFilename).normalize().toAbsolutePath();

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }

        return "/static/uploads/" + subFolder + "/" + uniqueFilename;
    }
}
