//
//  MyTableViewCell.swift
//  Test
//
//  Created by Wenqi He on 4/2/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import UIKit

class TableViewCell: UITableViewCell {

  var numberLabel: UILabel!
  var valueLabel: UILabel!
  var userLabel: UILabel!
  
  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    super.init(style: style, reuseIdentifier: reuseIdentifier)
    
    numberLabel = {
      let label = UILabel()
      return label
    }()
    valueLabel = {
      let label = UILabel()
      return label
    }()
    userLabel = {
      let label = UILabel()
      return label
    }()
    
    self.addSubview(numberLabel)
    self.addSubview(valueLabel)
    self.addSubview(userLabel)

    addConstraintWithFormat("V:|-5-[v0]-[v1]-[v2]-5-|", viewDict: [
      "v0": numberLabel,
      "v1": valueLabel,
      "v2": userLabel
    ])

    addConstraintWithFormat("H:|-20-[v0]-5-|", viewDict: ["v0": numberLabel])
    addConstraintWithFormat("H:|-20-[v0]-5-|", viewDict: ["v0": valueLabel])
    addConstraintWithFormat("H:|-20-[v0]-5-|", viewDict: ["v0": userLabel])
  }
  
  func addConstraintWithFormat(_ format: String, viewDict: [String: UIView]) -> Void {
    for view in viewDict.values {
      view.translatesAutoresizingMaskIntoConstraints = false
    }
    self.addConstraints(NSLayoutConstraint.constraints(
      withVisualFormat: format,
      options: NSLayoutFormatOptions(rawValue: 0),
      metrics: nil,
      views: viewDict))
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
