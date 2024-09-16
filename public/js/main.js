const treeData = {
  "name": "ノード1",
  "category": "node1",
  "tags": ["tag1", "tag2"],
  "node": [
    {
      "name": "ノード1-1",
      "category": "node1-1",
      "tags": ["tag1"],
      "node": []
    },
    {
      "name": "ノード1-2",
      "category": "node1-2",
      "tags": ["tag2"],
      "node": [
        {
          "name": "ノード1-2-1",
          "category": "node1-2-1",
          "tags": ["tag2"],
          "node": []
        },
        {
          "name": "ノード1-2-2",
          "category": "node1-2-2",
          "tags": ["tag2"],
          "node": []
        }
      ]
    }
  ]
};

function createTreeView(node, parentElement) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.textContent = node.name;
  a.href = '#';
  a.onclick = (e) => {
    e.preventDefault();
    document.getElementById('content-frame').src = `/${node.category}`;
  };
  li.appendChild(a);

  if (node.node && node.node.length > 0) {
    const ul = document.createElement('ul');
    node.node.forEach(childNode => createTreeView(childNode, ul));
    li.appendChild(ul);
  }

  parentElement.appendChild(li);
}

function initializeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const ul = document.createElement('ul');
  createTreeView(treeData, ul);
  sidebar.appendChild(ul);
}

function searchTree(query) {
  const results = [];
  function search(node) {
    if (node.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(node);
    }
    if (node.node) {
      node.node.forEach(search);
    }
  }
  search(treeData);
  return results;
}

function displaySearchResults(results) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';
  const ul = document.createElement('ul');
  results.forEach(node => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = node.name;
    a.href = '#';
    a.onclick = (e) => {
      e.preventDefault();
      document.getElementById('content-frame').src = `/${node.category}`;
    };
    li.appendChild(a);
    ul.appendChild(li);
  });
  sidebar.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 0) {
      const results = searchTree(query);
      displaySearchResults(results);
    } else {
      initializeSidebar();
    }
  });
});

function filterByTag(tag) {
  const nodes = searchTreeByTag(tag);
  displaySearchResults(nodes);
}

function searchTreeByTag(tag) {
  const result = [];
  function search(node) {
    if (node.tags && node.tags.includes(tag)) {
      result.push(node);
    }
    if (node.node) {
      node.node.forEach(child => search(child));
    }
  }
  search(treeData);
  return result;
}

function displaySearchResults(results) {
  const contentFrame = document.getElementById('content-frame');
  const doc = contentFrame.contentDocument || contentFrame.contentWindow.document;
  doc.open();
  doc.write('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">');
  results.forEach(node => {
    doc.write(`
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">${node.name}</h2>
          <div class="card-actions justify-end">
            <a href="/${node.category}" class="btn btn-primary">詳細を見る</a>
          </div>
        </div>
      </div>
    `);
  });
  doc.write('</div>');
  doc.close();
}