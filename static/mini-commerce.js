let bucket = [];

function addToBucket(productTitle, price) {
  if (!bucket.find((item) => item.title === productTitle)) {
    bucket.push({ title: productTitle, price });
    updateBucketCount();
    saveBucketToLocalStorage();
  }
}

function updateBucketCount() {
  const bucketCount = document.getElementById("bucket-count");
  bucketCount.textContent = bucket.length;
}

function saveBucketToLocalStorage() {
  localStorage.setItem("bucket", JSON.stringify(bucket));
}

function clearBucket() {
  localStorage.removeItem("bucket");
  bucket = [];
  updateBucketCount();
}
