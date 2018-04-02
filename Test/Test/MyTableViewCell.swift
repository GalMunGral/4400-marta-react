//
//  MyTableViewCell.swift
//  Test
//
//  Created by Wenqi He on 4/2/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class MyTableViewCell: UITableViewCell {

  @IBOutlet weak var numberLabel: UILabel!
  @IBOutlet weak var valueLabel: UILabel!
  @IBOutlet weak var userLabel: UILabel!
  
  override func awakeFromNib() {
    super.awakeFromNib()
    // Initialization code
  }

  override func setSelected(_ selected: Bool, animated: Bool) {
    super.setSelected(selected, animated: animated)
    // Configure the view for the selected state
  }

}
