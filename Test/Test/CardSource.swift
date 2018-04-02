//
//  CardSource.swift
//  Test
//
//  Created by Wenqi He on 4/1/18.
//  Copyright © 2018 Wenqi He. All rights reserved.
//

import Foundation
import UIKit

class CardSource: NSObject, UITableViewDataSource {
    
    struct Card: Codable {
        var breezecardNum: String
        var value: String
        var belongsTo: String
        func toString() -> String {
            return self.breezecardNum + self.value + self.belongsTo
        }
    }
    
    var data:[Card] = []
    let tableViewController: UITableViewController?
    
    init(_ tableViewController: UITableViewController) {
        self.tableViewController = tableViewController
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.data.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CardCell")!
        let datum = self.data[indexPath.row]
        cell.textLabel?.text = datum.toString()
        return cell
    }
    
    func fetch() -> Void {
        let url = URL(string: "http://localhost:3000/cards")!
        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                print(error)
                return
            }
            if let response = response {
                print(response.mimeType!)
            }
            if let data = data {
                DispatchQueue.main.async {
                    let dec = JSONDecoder()
                    if let dict = (try? dec.decode([Card].self, from: data)) {
                        self.data = dict
                        print(self.data)
                        self.tableViewController?.tableView.reloadData()
                    }
                }
                return
            }
        }
        task.resume()
    }

}
