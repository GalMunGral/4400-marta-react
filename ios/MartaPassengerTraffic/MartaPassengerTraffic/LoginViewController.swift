//
//  LoginViewController.swift
//  Test
//
//  Created by Wenqi He on 4/8/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

struct Credential: Encodable {
  let username: String?
  let password: String?
}

struct Response: Decodable {
  let success: Bool
  let error: String?
  let userType: String?
}

class LoginViewController: UIViewController {
  var button: UIButton!
  var usernameInput: UITextField!
  var passwordInput: UITextField!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.view.backgroundColor = .white
    
    usernameInput = {
      let input = UITextField()
      input.autocapitalizationType = .none
      input.placeholder = "Username"
      input.translatesAutoresizingMaskIntoConstraints = false
      input.textAlignment = .center
      return input
    }()
    self.view.addSubview(usernameInput)
    
    passwordInput = {
      let input = UITextField()
      input.autocapitalizationType = .none
      input.placeholder = "Password"
      input.translatesAutoresizingMaskIntoConstraints = false
      input.textAlignment = .center
      return input
    }()
    self.view.addSubview(passwordInput)
    
    
    button = {
      let button = UIButton(type: UIButtonType.system)
      button.setTitle("Login", for: .normal)
      button.translatesAutoresizingMaskIntoConstraints = false
      return button
    }()
    self.view.addSubview(button)
    
    usernameInput.centerXAnchor
      .constraint(equalTo: view.centerXAnchor).isActive = true
    usernameInput.centerYAnchor
      .constraint(equalTo: view.centerYAnchor, constant: -10).isActive = true
    usernameInput.widthAnchor
      .constraint(equalToConstant: 100).isActive = true
    passwordInput.centerXAnchor
      .constraint(equalTo: view.centerXAnchor).isActive = true
    passwordInput.topAnchor
      .constraint(equalTo: usernameInput.bottomAnchor, constant: 10).isActive = true
    passwordInput.widthAnchor
      .constraint(equalToConstant: 100).isActive = true
    button.centerXAnchor
      .constraint(equalTo: view.centerXAnchor).isActive = true
    button.topAnchor
      .constraint(equalTo: passwordInput.bottomAnchor, constant: 10).isActive = true
    
    button.addTarget(self, action: #selector(login), for: .touchUpInside)
  }
  
  @objc func login() -> Void {
    let encoder = JSONEncoder()
    let decoder = JSONDecoder()
    let url = URL(string: "http://localhost:8080/login")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.httpBody = try? encoder.encode(
      Credential(username: usernameInput.text, password: passwordInput.text)
    )
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    let task = URLSession.shared.dataTask(with: request) { (data, res, err) in
      if let err = err {
        print(err)
      }
      if let data = data,
        let res = try? decoder.decode(Response.self, from: data) {
        if res.success {
          DispatchQueue.main.async {
            let vc = TabBarController()
            self.present(vc, animated: true, completion: nil)
          }
        }
      }
    }
    task.resume()
}
 
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  
  /*
   // MARK: - Navigation
   
   // In a storyboard-based application, you will often want to do a little preparation before navigation
   override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
   // Get the new view controller using segue.destinationViewController.
   // Pass the selected object to the new view controller.
   }
   */
  
}
