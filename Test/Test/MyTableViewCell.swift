//
//  MyTableViewCell.swift
//  Test
//
//  Created by Wenqi He on 4/2/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class MyTableViewCell: UITableViewCell {

  var numberLabel: UILabel!
  var valueLabel: UILabel!
  var userLabel: UILabel!
  
  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    super.init(style: style, reuseIdentifier: reuseIdentifier)
    numberLabel = UILabel()
    valueLabel = UILabel()
    userLabel = UILabel()
    self.addSubview(numberLabel)
    numberLabel.frame = self.frame
    self.addSubview(valueLabel)
    self.addSubview(userLabel)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func awakeFromNib() {
    super.awakeFromNib()
    // Initialization code
  }

  override func setSelected(_ selected: Bool, animated: Bool) {
    super.setSelected(selected, animated: animated)
    // Configure the view for the selected state
  }

}
