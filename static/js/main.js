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

// ツリーのJSONから検索を行う
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

document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();

  // テキスト検索に入力されたときのイベントリスナー
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 0) {
      const results = searchTree(query);
      displaySearchResults(results);
    } else {
      //initializeSidebar();
    }
  });
});

// タグフィルタリング
function filterByTag(tag) {
  const nodes = searchTreeByTag(tag);
  displaySearchResults(nodes);
}

// タグ検索
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

// ステータスフィルタリング
function filterByStatus(status) {
  const nodes = searchTreeByStatus(status);
  displaySearchResults(nodes);
}

// ステータス検索
function searchTreeByStatus(status) {
  const result = [];
  function search(node) {
    if (node.sections && node.sections.some(section => section.status === status)) {
      result.push(node);
    }
    if (node.node) {
      node.node.forEach(child => search(child));
    }
  }
  search(treeData);
  return result;
}

// 検索結果表示
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
  doc.write('<link href="/css/tailwind.css" rel="stylesheet">');
  doc.close();
}