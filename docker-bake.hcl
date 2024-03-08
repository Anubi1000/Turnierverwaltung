group "default" {
    targets = ["frontend", "backend"]
}

target "frontend" {
    context = "./frontend"
    tags = [
        "anubi1000/turnierplaner/frontend"
    ]
}

target "backend" {
    context = "./backend"
    tags = [
        "anubi1000/turnierplaner/backend"
    ]
}