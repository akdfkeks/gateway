#!/bin/bash

# Define the list of .env.example files
FILES=("auth.env.example" "event.env.example" "gateway.env.example")

# Loop through each file and copy it without the .example postfix
for FILE in "${FILES[@]}"; do
    SRC="./$FILE"
    DEST="./${FILE/.example/}"
    if [ -f "$SRC" ]; then
        cp "$SRC" "$DEST"
        echo "Copied $SRC to $DEST"
    else
        echo "File $SRC does not exist."
    fi
done