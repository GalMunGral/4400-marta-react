//
//  ViewController.swift
//  Test
//
//  Created by Wenqi He on 4/1/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class ViewController: UITableViewController {
  var source:CardSource?

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }
  override init(style: UITableViewStyle) {
    super.init(style: style)
    self.source = CardSource(self)
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    self.tableView.register(MyTableViewCell.self, forCellReuseIdentifier: "CardCell")
    self.tableView.dataSource = source
    self.tableView.delegate = self
    self.source?.fetch()
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
}

