import Foundation

class ClaudeAPIService {
    // TODO: Replace with your Anthropic API key from https://console.anthropic.com
    private let apiKey = "YOUR_API_KEY"
    private let endpoint = URL(string: "https://api.anthropic.com/v1/messages")!
    private let model = "claude-sonnet-4-6"

    func sendMessage(history: [Message]) async throws -> String {
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
        request.setValue("2023-06-01", forHTTPHeaderField: "anthropic-version")
        request.setValue("application/json", forHTTPHeaderField: "content-type")

        let messages = history.map { ["role": $0.role, "content": $0.content] }
        let body: [String: Any] = [
            "model": model,
            "max_tokens": 1024,
            "messages": messages
        ]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            let errorBody = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw ClaudeError.apiError(errorBody)
        }

        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        guard
            let content = (json?["content"] as? [[String: Any]])?.first,
            let text = content["text"] as? String
        else {
            throw ClaudeError.parseError
        }
        return text
    }
}

enum ClaudeError: LocalizedError {
    case apiError(String)
    case parseError

    var errorDescription: String? {
        switch self {
        case .apiError(let msg): return "API Error: \(msg)"
        case .parseError: return "Failed to parse response"
        }
    }
}
