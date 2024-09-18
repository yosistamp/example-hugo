const treeData = {
    "name": "ノード1",
    "category": "node1",
    "tags": ["tag1", "tag2"],
    "sections": [],
    "node": [
      {
        "name": "ノード1-1",
        "category": "node1-1",
        "tags": ["tag1"],
        "sections": [
            {
                "name": "セクション1",
                "status": "取組中"
            },
            {
                "name": "セクション2",
                "status": "経験有"
            }
        ],
        "node": []
      },
      {
        "name": "ノード1-2",
        "category": "node1-2",
        "tags": ["tag2"],
        "sections": [],
        "node": [
          {
            "name": "ノード1-2-1",
            "category": "node1-2-1",
            "tags": ["tag2"],
            "sections": [
                {
                    "name": "セクション1",
                    "status": "取組中"
                },
                {
                    "name": "セクション3",
                    "status": "情報収集"
                }
            ],
                "node": []
          },
          {
            "name": "ノード1-2-2",
            "category": "node1-2-2",
            "tags": ["tag2"],
            "sections": [
                {
                    "name": "セクション1",
                    "status": "情報収集"
                },
                {
                    "name": "セクション2",
                    "status": "経験有"
                }
            ],
            "node": []
          }
        ]
      }
    ]
  };