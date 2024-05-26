document.addEventListener('DOMContentLoaded', function () {
  var defaultselectbox = document.getElementById('cusSelectbox');
  var numOfOptions = defaultselectbox.children.length;

  // Hide select tag
  defaultselectbox.classList.add('s-hidden');

  // Wrapping default selectbox into custom select block
  var cusSelBlock = document.createElement('div');
  cusSelBlock.classList.add('cusSelBlock');
  defaultselectbox.parentNode.insertBefore(cusSelBlock, defaultselectbox);
  cusSelBlock.appendChild(defaultselectbox);

  // Creating custom select div
  var selectLabel = document.createElement('div');
  selectLabel.classList.add('selectLabel');
  selectLabel.setAttribute('role', 'button');
  selectLabel.setAttribute('aria-haspopup', 'listbox');
  selectLabel.setAttribute('aria-expanded', 'false');
  selectLabel.innerText = defaultselectbox.children[0].innerText;
  cusSelBlock.appendChild(selectLabel);

  // Appending options to custom un-ordered list tag
  var cusList = document.createElement('ul');
  cusList.classList.add('options');
  cusList.setAttribute('role', 'listbox');
  selectLabel.parentNode.insertBefore(cusList, selectLabel.nextSibling);

  // Generating custom list items
  for (var i = 0; i < numOfOptions; i++) {
      var optionText = defaultselectbox.children[i].innerText;
      var optionValue = defaultselectbox.children[i].value;
      var listItem = document.createElement('li');
      listItem.innerText = optionText;
      listItem.setAttribute('data-value', optionValue);
      listItem.setAttribute('role', 'option');
      cusList.appendChild(listItem);
  }

  // Open list and close list functions
  function openList() {
      for (var i = 0; i < numOfOptions; i++) {
          cusList.children[i].style.transform = 'translateY(' + (i * 100 + 100) + '%)';
          cusList.children[i].style.transitionDelay = i * 30 + 'ms';
      }
      selectLabel.setAttribute('aria-expanded', 'true');
  }

  function closeList() {
      for (var i = 0; i < numOfOptions; i++) {
          cusList.children[i].style.transform = 'translateY(0)';
          cusList.children[i].style.transitionDelay = '0';
      }
      selectLabel.setAttribute('aria-expanded', 'false');
  }

  // Click event functions
  selectLabel.addEventListener('click', function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
          openList();
      } else {
          closeList();
      }
  });

  cusList.addEventListener('click', function (e) {
      var selectedText = e.target.innerText;
      selectLabel.innerText = selectedText;
      defaultselectbox.value = selectedText;
      closeList();
      selectLabel.classList.remove('active');
  });

  // Keyboard navigation
  selectLabel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
          e.preventDefault();
          cusList.children[0].focus();
      }
  });

  cusList.addEventListener('keydown', function (e) {
      var activeElement = document.activeElement;
      if (e.key === 'ArrowDown' && activeElement.nextElementSibling) {
          e.preventDefault();
          activeElement.nextElementSibling.focus();
      } else if (e.key === 'ArrowUp' && activeElement.previousElementSibling) {
          e.preventDefault();
          activeElement.previousElementSibling.focus();
      } else if (e.key === 'Enter') {
          e.preventDefault();
          activeElement.click();
      } else if (e.key === 'Escape') {
          closeList();
          selectLabel.focus();
      }
  });

  // Click outside to close
  document.addEventListener('click', function (e) {
      if (!cusSelBlock.contains(e.target)) {
          closeList();
          selectLabel.classList.remove('active');
      }
  });
});
