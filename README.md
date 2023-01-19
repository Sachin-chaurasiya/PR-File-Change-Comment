# PR-File-Change-Threshold-Comment

## Usage

```YAML
name: File Change Threshold
on:
  pull_request

jobs:
  file_change_threshold:
    runs-on: ubuntu-latest
    steps:
    - name: Check file change threshold
      uses: Sachin-chaurasiya/PR-File-Change-Threshold-Comment@main
      with:
        threshold: 5
        github_token: ${{ secrets.GITHUB_TOKEN }}

```

## Example Comment

<img width="965" alt="image" src="https://user-images.githubusercontent.com/59080942/213472614-53bd5151-0202-4d18-a137-aadd4f5a4b3e.png">
