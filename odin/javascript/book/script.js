function Book(title, authors, journal, year, citations, tags) {
    this.title = title;
    this.authors = authors;
    this.journal = journal;
    this.year = year;
    this.citations = citations;
    this.tags = tags;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.authors} was published in ${this.year}. It has ${this.citations} citations and is tagged as ${this.tags}.`;
}

const myLibrary = [
    new Book(
        title="Attention Is All You Need",
        authors="Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, et al.",
        journal="Advances in Neural Information Processing Systems 30 (NIPS 2017)",
        year=2017,
        citations=56204,
        tags=["AI", "NLP"],
    ),
    new Book(
        title="Deep Residual Learning for Image Recognition",
        authors="Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
        journal="2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
        year=2016,
        citations=124896,
        tags=["CV", "Deep Learning"],
    ),
    new Book(
        title="BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors="Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
        journal="NAACL-HLT 2019",
        year=2019,
        citations=68530,
        tags=["AI", "NLP"],
    )
];


function addBookToLibrary(title, authors="", journal="", year=0, citations=0, tags=[]) {
    // take params, create a book then store it in the array
    newBook = new Book(title, authors, journal, year, citations, tags);
    myLibrary.push(newBook);
    renderTable(myLibrary);
}
function removeBook(idx) {
    console.log(myLibrary, idx);
    myLibrary.splice(idx, 1);
    console.log(myLibrary);
    
    renderTable(myLibrary);
}
function addBook() {
    event.preventDefault();
    // Get form values
    const title = document.getElementById('paper-title').value.trim();
    const authors = document.getElementById('paper-authors').value.trim();
    const journal = document.getElementById('paper-journal').value.trim();
    const yearStr = document.getElementById('paper-year').value.trim();
    const citationsStr = document.getElementById('paper-citations').value.trim();
    const tagsStr = document.getElementById('paper-tags').value.trim();
    const abstract = document.getElementById('paper-abstract').value.trim();
    
    // Validate required fields
    let isValid = true;
    
    if (!title) {
      markInvalid('paper-title', 'Title is required');
      isValid = false;
    } else {
      clearInvalid('paper-title');
    }
    
    if (!authors) {
      markInvalid('paper-authors', 'Authors are required');
      isValid = false;
    } else {
      clearInvalid('paper-authors');
    }
    
    if (!journal) {
      markInvalid('paper-journal', 'Journal/Conference is required');
      isValid = false;
    } else {
      clearInvalid('paper-journal');
    }
    
    if (!yearStr) {
      markInvalid('paper-year', 'Year is required');
      isValid = false;
    } else {
      clearInvalid('paper-year');
    }
    
    if (!isValid) {
      return;
    }
    
    // Parse numeric values
    const year = parseInt(yearStr);
    const citations = citationsStr ? parseInt(citationsStr) : 0;
    
    // Parse tags
    const tags = tagsStr ? tagsStr.split(',').map(tag => tag.trim()) : [];
        
    // Add to library
    addBookToLibrary(title, authors, journal, year, citations, tags);
    
    // Update the table (assuming renderTable is defined elsewhere)
    if (typeof renderTable === 'function') {
      renderTable(myLibrary);
    }
    
    // Show success message
    showSuccessMessage('Paper added successfully!');
    
    // Reset the form
    resetForm();
}

// Function to reset the form
function resetForm() {
    document.getElementById('paper-title').value = '';
    document.getElementById('paper-authors').value = '';
    document.getElementById('paper-journal').value = '';
    document.getElementById('paper-year').value = '';
    document.getElementById('paper-citations').value = '';
    document.getElementById('paper-tags').value = '';
    document.getElementById('paper-abstract').value = '';
}

// Function to mark a field as invalid
function markInvalid(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('invalid');
    
    // Check if error message already exists
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error');
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
}
  
// Function to clear invalid state
function clearInvalid(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('invalid');
    
    // Remove error message if it exists
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
      errorElement.remove();
    }
}
  
// Function to show success message
function showSuccessMessage(message) {
    // Check if success message element exists
    let successElement = document.querySelector('.success-message');
    
    if (!successElement) {
      // Create it if it doesn't exist
      successElement = document.createElement('div');
      successElement.classList.add('success-message');
      const form = document.querySelector('.add-paper-form');
      form.insertBefore(successElement, form.firstChild);
    }
    
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
      successElement.style.display = 'none';
    }, 3000);
}


function renderTable(books) {
    const tableBody = document.getElementById('papers-table');
    tableBody.innerHTML = ''; // Clear table
    let idx = 0;
    books.forEach(book => {
        const row = document.createElement('tr');
        
        // Paper column
        const paperCell = document.createElement('td');
        
        const titleElem = document.createElement('a');
        titleElem.className = 'paper-title';
        titleElem.textContent = book.title;
        
        const authorsElem = document.createElement('div');
        authorsElem.className = 'authors';
        authorsElem.textContent = book.authors;
        
        const journalElem = document.createElement('div');
        journalElem.className = 'journal';
        journalElem.textContent = book.journal;
        
        paperCell.appendChild(titleElem);
        paperCell.appendChild(authorsElem);
        paperCell.appendChild(journalElem);
        
        // Year column
        const yearCell = document.createElement('td');
        yearCell.textContent = book.year;
        
        // Citations column
        const citationsCell = document.createElement('td');
        citationsCell.textContent = book.citations.toLocaleString();
        
        // Tags column
        const tagsCell = document.createElement('td');
        book.tags.forEach(tag => {
            const tagElem = document.createElement('span');
            tagElem.className = 'tag';
            tagElem.textContent = tag;
            tagsCell.appendChild(tagElem);
        });
        
        // Actions column
        const actionsCell = document.createElement('td');
        
        const saveButton = document.createElement('button');
        saveButton.className = 'action-button';
        saveButton.textContent = 'Save';
        
        const citeButton = document.createElement('button');
        citeButton.className = 'action-button';
        citeButton.textContent = 'Cite';

        const removeButton = document.createElement('button');
        removeButton.className = 'action-button';
        removeButton.dataset.idx = idx;
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            const idx = this.dataset.idx;
            console.log(idx);
            removeBook(Number(idx))});

        actionsCell.appendChild(saveButton);
        actionsCell.appendChild(citeButton);
        actionsCell.appendChild(removeButton);
        
        // Append all cells to the row
        row.appendChild(paperCell);
        row.appendChild(yearCell);
        row.appendChild(citationsCell);
        row.appendChild(tagsCell);
        row.appendChild(actionsCell);
        
        // Append the row to the table
        tableBody.appendChild(row);
        idx += 1;
    });
}

function renderAddForm() {
    const form = document.querySelector('.add-paper-form');
    form.style.display = 'block';
}
function hideAddForm() {
    const form = document.querySelector('.add-paper-form');
    form.style.display = 'none';
}

renderTable(myLibrary);
document.querySelector('.add-button').addEventListener('click', renderAddForm);
document.querySelector('#add-paper-submit').addEventListener('click', addBook);
document.querySelector('#add-paper-cancel').addEventListener('click', hideAddForm);
