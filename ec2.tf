resource "aws_instance" "web" {
  ami           = "ami-0faab6bdbac9486fb"
  instance_type = "t2.micro"
  key_name      = "brightfuture-key"

  tags = {
    Name = "brightfuture-web"
  }
}
