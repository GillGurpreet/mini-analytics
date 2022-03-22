let fs = require('fs');

let data_to_read = `./data/data1`;
let data_to_write = `./data/data2.json`;

// If MINI_ANALYTICS_INTERVAL is omitted, it should still run every 5 seconds.
let MINI_ANALYTICS_INTERVAL = process.env.MINI_ANALYTICS_INTERVAL ? process.env.MINI_ANALYTICS_INTERVAL : 5;
let offset = 0;

// Worker runs every MINI_ANALYTICS_INTERVAL seconds
setInterval(() => {

    const stream = fs.createReadStream(data_to_read, { start: offset, encoding: "utf-8"});
    stream.on("data", chunks => {
        chunks = chunks.split("\n");

        console.log(chunks);
        // Newline characters exist and are 1 byte each (at most chunks.length - 1 exist)
        if (chunks.length > 1) {
            offset += chunks.length - 1;
        }

        // Read the running count of experienceIDs in data2, and increment offset 
        // by 1 byte/character
        let data2 = require(`./json/data2.json`);
        let records_updated = 0;
        for (let i = 0; i < chunks.length; i++) {
            let next_number = chunks[i];

            // Increment offset by 1 byte/character
            offset += next_number.length;

            // Sometimes an empty string shows up in the split (on my mac at least)
            if (next_number !== '') {
                if (data2[next_number]) {
                    data2[next_number] += 1;
                } else {
                    data2[next_number] = 1;
                }
                records_updated += 1;
            }
        }

        // Write result to data2
        fs.writeFile(data_to_write, JSON.stringify(data2), err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
        });

        console.log(`Data2 has been updated successfully! ${records_updated} update(s) were made.`);
        stream.close();
    });

    // console.log("running lol");
}, MINI_ANALYTICS_INTERVAL * 1000)
