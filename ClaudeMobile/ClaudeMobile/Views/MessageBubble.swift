import SwiftUI

struct MessageBubble: View {
    let message: Message

    private var isUser: Bool { message.role == "user" }

    var body: some View {
        HStack {
            if isUser { Spacer() }
            Text(message.content)
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
                .background(isUser ? Color.blue : Color(UIColor.secondarySystemBackground))
                .foregroundColor(isUser ? .white : .primary)
                .clipShape(RoundedRectangle(cornerRadius: 18))
                .frame(maxWidth: UIScreen.main.bounds.width * 0.72, alignment: isUser ? .trailing : .leading)
            if !isUser { Spacer() }
        }
        .padding(.horizontal, 12)
    }
}
