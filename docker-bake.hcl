group "default" {
    targets = ["frontend", "backend"]
}

variable "TAG" {
    default = "latest"
}

target "frontend" {
    context = "./frontend"
    tags = [
        "anubi1000/turnierplaner/frontend:${TAG}"
    ]
}

target "backend" {
    context = "./backend"
    tags = [
        "anubi1000/turnierplaner/backend:${TAG}"
    ]
}