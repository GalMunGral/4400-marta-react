//
//  ViewController.swift
//  Test
//
//  Created by Wenqi He on 4/1/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class TableViewController: UITableViewController {
  var source:CardSource?

  override init(style: UITableViewStyle) {
    super.init(style: style)
    self.source = CardSource(self)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    self.tableView.register(TableViewCell.self, forCellReuseIdentifier: "CardCell")
    self.tableView.rowHeight = 100
    self.tableView.dataSource = source
    self.tableView.delegate = self
    self.source?.fetch()
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
}

