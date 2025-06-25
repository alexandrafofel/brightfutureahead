resource "aws_instance" "web" {
  ami           = "ami-0faab6bdbac9486fb" # Amazon Linux 2 pentru N. Virginia
  instance_type = "t2.micro"

  subnet_id              = "subnet-0ea88fd8b99d74e57"
  vpc_security_group_ids = []
  key_name               = "brightfuture-key" # numele exact al cheii .pem din AWS

  tags = {
    Name = "brightfuture-web"
  }
}
