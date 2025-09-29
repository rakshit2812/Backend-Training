const fs = require('fs');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to read products from file
function readProducts() {
    try {
        const data = fs.readFileSync('products.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error.message);
        return [];
    }
}

// Function to write products to file
function writeProducts(products) {
    try {
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        console.log('Products updated successfully!');
    } catch (error) {
        console.error('Error writing products file:', error.message);
    }
}

// Function to create backup file
function createBackup() {
    try {
        const data = fs.readFileSync('products.json', 'utf8');
        fs.writeFileSync('backup.json', data);
        console.log('Backup file created successfully!');
    } catch (error) {
        console.error('Error creating backup:', error.message);
    }
}

// Function to get next product ID
function getNextId(products) {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

// Function to add a new product
function addProduct(products, productData) {
    const newProduct = {
        id: getNextId(products),
        name: productData.name,
        price: parseFloat(productData.price)
    };
    products.push(newProduct);
    return products;
}

// Function to prompt for product details
function promptForProduct(productNumber) {
    return new Promise((resolve) => {
        console.log(`\n--- Adding Product ${productNumber} ---`);
        
        const product = {};
        
        rl.question('Enter product name: ', (name) => {
            product.name = name; 
            rl.question('Enter product price: ', (price) => {
                product.price = price;
                resolve(product);
            });
        });
    });
}

// User reading functions
function user1ReadBackup() {
    return new Promise((resolve) => {
        console.log('\n=== User 1 Reading Backup ===');
        try {
            const data = fs.readFileSync('backup.json', 'utf8');
            const products = JSON.parse(data);
            console.log(`User 1 read ${products.length} products from backup.json`);
            console.log('User 1 finished reading.');
            resolve(`User 1 read ${products.length} products`);
        } catch (error) {
            console.error('User 1 error reading backup:', error.message);
            resolve('User 1 failed to read backup');
        }
    });
}

function user2ReadBackup() {
    return new Promise((resolve) => {
        console.log('\n=== User 2 Reading Backup ===');
        try {
            const data = fs.readFileSync('backup.json', 'utf8');
            const products = JSON.parse(data);
            console.log(`User 2 read ${products.length} products from backup.json`);
            console.log('User 2 finished reading.');
            resolve(`User 2 read ${products.length} products`);
        } catch (error) {
            console.error('User 2 error reading backup:', error.message);
            resolve('User 2 failed to read backup');
        }
    });
}

function user3ReadBackup() {
    return new Promise((resolve) => {
        console.log('\n=== User 3 Reading Backup ===');
        try {
            const data = fs.readFileSync('backup.json', 'utf8');
            const products = JSON.parse(data);
            console.log(`User 3 read ${products.length} products from backup.json`);
            console.log('User 3 finished reading.');
            resolve(`User 3 read ${products.length} products`);
        } catch (error) {
            console.error('User 3 error reading backup:', error.message);
            resolve('User 3 failed to read backup');
        }
    });
}

// Function to delete backup file
function deleteBackup() {
    try {
        if (fs.existsSync('backup.json')) {
            fs.unlinkSync('backup.json');
            console.log('\nBackup file deleted successfully!');
        } else {
            console.log('\nBackup file does not exist.');
        }
    } catch (error) {
        console.error('Error deleting backup file:', error.message);
    }
}

// Main function
async function main() {
    console.log('=== Product Management System ===');
    console.log('Initial products loaded from products.json');
    
    let products = readProducts();
    console.log(`Current products count: ${products.length}`);
    
    // Get number of products to add
    const numProductsToAdd = await new Promise((resolve) => {
        rl.question('\nHow many products do you want to add? ', (answer) => {
            const num = parseInt(answer);
            resolve(num);
        });
    });
    
    // Add new products
    for (let i = 1; i <= numProductsToAdd; i++) {
        const productData = await promptForProduct(i);
        products = addProduct(products, productData);
        console.log(`Product ${i} added successfully!`);
    }
    
    // Write updated products to file
    writeProducts(products);
    
    // Create backup
    createBackup();
    
    console.log('\n=== Starting User Reading Process ===');
    
    // All three users read the backup file
    await user1ReadBackup();
    await user2ReadBackup();
    await user3ReadBackup();
    
    // Wait for 3 seconds before deleting backup file
    console.log('\nWaiting 3 seconds before deleting backup file...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Delete backup file
    deleteBackup();
    
    console.log('\n=== Process Complete ===');
    console.log('All tasks completed successfully!');
    
    rl.close();
}

// Start the application
main().catch(error => {
    console.error('Application error:', error);
    rl.close();
});
