group "default" {
    targets = ["frontend", "backend"]
}

variable "TAG" {
    default = "latest"
}

target "frontend" {
    context = "./frontend"
    tags = [
        "anubi1000/turnierverwaltung/frontend:${TAG}"
    ]
}

target "backend" {
    context = "./backend"
    tags = [
        "anubi1000/turnierverwaltung/backend:${TAG}"
    ]
}
