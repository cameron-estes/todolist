-- Here I will define any data tables I may create to represent the todo list
CREATE TABLE listitems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT NOT NULL
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment TEXT,
    listing_id INT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listitems(id) ON DELETE CASCADE
);

