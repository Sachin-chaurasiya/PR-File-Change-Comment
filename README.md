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
