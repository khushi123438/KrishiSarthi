package com.krishisarthi.dto;

public class AiDtos {

    public static class PromptRequest {
        private String prompt;
        private String language = "hi";

        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
    }

    public static class PromptResponse {
        private String reply;

        public PromptResponse() {}
        public PromptResponse(String reply) {
            this.reply = reply;
        }

        public String getReply() { return reply; }
        public void setReply(String reply) { this.reply = reply; }
    }
}
