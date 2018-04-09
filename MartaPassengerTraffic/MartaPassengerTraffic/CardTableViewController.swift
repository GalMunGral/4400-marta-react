//
//  ViewController.swift
//  Test
//
//  Created by Wenqi He on 4/1/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class CardTableViewController: UITableViewController {
  var source:CardSource?

  convenience init() {
    self.init(style: .plain)
  }
  override init(style: UITableViewStyle) {
    super.init(style: style)
    self.source = CardSource(self)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Table view
    self.tableView.register(CardTableCell.self, forCellReuseIdentifier: "CardCell")
    self.tableView.rowHeight = 100
    self.tableView.dataSource = source
    self.tableView.delegate = self
    self.source?.fetch()
    // Navigation Item
    self.navigationItem.rightBarButtonItem =
      UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(test(_:)))
    self.navigationItem.title = "Breezecards"
    // Tab Bar Item
    self.tabBarItem = UITabBarItem(title: "Breezecard", image: UIImage(named: "card"), tag: 0)
  }
  
  @objc func test(_ sender: UIBarButtonItem) -> Void {
    self.navigationController?.pushViewController(CardTableViewController(), animated: true)
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
}

