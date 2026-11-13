package com.krishisarthi.controller;

import com.krishisarthi.dto.AiDtos.PromptRequest;
import com.krishisarthi.dto.AiDtos.PromptResponse;
import com.krishisarthi.security.SecurityUtils;
import com.krishisarthi.service.GeminiAiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@Tag(name = "Kisan Mitra AI", description = "Google Gemini AI Assistant grounded in live marketplace database context")
public class GeminiAiController {

    private final GeminiAiService geminiAiService;

    public GeminiAiController(GeminiAiService geminiAiService) {
        this.geminiAiService = geminiAiService;
    }

    @PostMapping("/chat")
    @Operation(summary = "Chat with Kisan Mitra AI Assistant with live orders/listings grounding in Hindi & Hinglish")
    public ResponseEntity<PromptResponse> chat(@RequestBody PromptRequest request) {
        Long userId = SecurityUtils.getCurrentUserId().orElse(null);
        String reply = geminiAiService.queryAssistant(userId, request.getPrompt(), request.getLanguage());
        return ResponseEntity.ok(new PromptResponse(reply));
    }
}
