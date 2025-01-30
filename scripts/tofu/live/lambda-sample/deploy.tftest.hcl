# deploy.tftest.hcl
run "deploy" {
  command = apply
}

run "validate" {
  command = apply
  
  module {
    source = "../../modules/test-endpoint"
  }

  module "lambda-sample" {
    source = "../tofu/live/lambda-sample"
    # Ajoutez ici toutes les variables nécessaires au module
  }

  output "api_endpoint" {
    value = module.lambda-sample.api_endpoint
  }

  variables {
    endpoint = run.deploy.api_endpoint
  }

  assert {
    condition = data.http.test_endpoint.status_code == 200
    error_message = <<EOT
Unexpected status code: ${data.http.test_endpoint.status_code}
EOT
  }

  assert {
    condition = data.http.test_endpoint.response_body == "Hello, World!"
    error_message = <<EOT
Unexpected response body: ${data.http.test_endpoint.response_body}
EOT
  }
}
