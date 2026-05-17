import Foundation

struct Message: Identifiable {
    let id = UUID()
    let role: String
    let content: String
}
