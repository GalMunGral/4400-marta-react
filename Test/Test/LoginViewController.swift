//
//  LoginViewController.swift
//  Test
//
//  Created by Wenqi He on 4/8/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
  var button: UIButton!
  var usernameInput: UITextField!
  var passwordInput: UITextField!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.view.backgroundColor = .white
    
    usernameInput = {
      let input = UITextField()
      input.placeholder = "Username"
      input.translatesAutoresizingMaskIntoConstraints = false
      input.textAlignment = .center
      return input
    }()
    self.view.addSubview(usernameInput)
    
    passwordInput = {
      let input = UITextField()
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
    
    usernameInput.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
    usernameInput.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -10).isActive = true
    usernameInput.widthAnchor.constraint(equalToConstant: 100).isActive = true
    passwordInput.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
    passwordInput.topAnchor.constraint(equalTo: usernameInput.bottomAnchor, constant: 10).isActive = true
    passwordInput.widthAnchor.constraint(equalToConstant: 100).isActive = true
    button.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
    button.topAnchor.constraint(equalTo: passwordInput.bottomAnchor, constant: 10).isActive = true
    
    button.addTarget(self, action: #selector(test), for: .touchUpInside)
  }
  
  @objc func test() -> Void {
    print(usernameInput.text!)
    print(passwordInput.text!)
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
