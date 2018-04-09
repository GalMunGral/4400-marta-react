//
//  CardSource.swift
//  Test
//
//  Created by Wenqi He on 4/1/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import Foundation
import UIKit

struct Card: Codable {
  var breezecardNum: String
  var value: String
  var belongsTo: String
  func toString() -> String {
    return self.breezecardNum + self.value + self.belongsTo
  }
}

class CardSource: NSObject, UITableViewDataSource {
  
  var data:[Card] = []
  let tableViewController: UITableViewController?
  
  init(_ tableViewController: UITableViewController) {
    self.tableViewController = tableViewController
  }

  func fetch() -> Void {
    let url = URL(string: "http://localhost:3000/cards")!
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
      if let data = data {
        let dec = JSONDecoder()
        if let dict = (try? dec.decode([Card].self, from: data)) {
          self.data = dict
          DispatchQueue.main.async {
            self.tableViewController?.tableView.reloadData()
          }
        }
        return
      }
    }
    task.resume()
  }
  
  // Table data source
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return self.data.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "CardCell") as! CardTableCell
    let datum = self.data[indexPath.row]
    cell.numberLabel.text = "Breezecard No.: \(datum.breezecardNum)"
    cell.valueLabel.text = "Value: \(datum.value)"
    cell.userLabel.text = "Belongs to: \(datum.belongsTo)"
    return cell
  }

}
