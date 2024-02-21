function deleteOldEmails() {
  const daysOld = 30;  // Number of days after which emails are considered old
  const expireLabel = GmailApp.getUserLabelByName('Expires Soon...');  // Ensure label name matches

  if (!expireLabel) {
    console.log('Label not found.');
    return;  // Exit if label does not exist
  }

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);  // Calculate cutoff date

  let start = 0;
  const batchSize = 100;  // Process emails in batches to manage memory and performance

  while (true) {
    const threads = expireLabel.getThreads(start, batchSize);
    if (threads.length === 0) break;  // Exit loop if no more threads

    threads.forEach(thread => {
      if (thread.getLastMessageDate() < cutoffDate) {
        thread.moveToTrash();
        console.log("Email Trashed!");
      }
    });

    start += batchSize;  // Move to the next batch
  }
}
