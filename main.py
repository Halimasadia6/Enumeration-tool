import sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout, QLineEdit, QFileDialog, QLabel, QTextEdit
from PyQt5.QtCore import Qt
import subprocess

class PasswordTool(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.targetInput = QLineEdit(self)
        self.targetInput.setPlaceholderText('Enter target (e.g., example.com)')

        self.wordlistInput = QLineEdit(self)
        self.wordlistInput.setPlaceholderText('Select wordlist file')
        self.wordlistButton = QPushButton('Browse', self)
        self.wordlistButton.clicked.connect(self.browseWordlist)

        self.startButton = QPushButton('Start Attack', self)
        self.startButton.clicked.connect(self.startAttack)

        self.resultArea = QTextEdit(self)
        self.resultArea.setReadOnly(True)

        layout = QVBoxLayout()
        layout.addWidget(QLabel('Target:', self))
        layout.addWidget(self.targetInput)
        layout.addWidget(QLabel('Wordlist:', self))
        layout.addWidget(self.wordlistInput)
        layout.addWidget(self.wordlistButton)
        layout.addWidget(self.startButton)
        layout.addWidget(self.resultArea)

        self.setLayout(layout)
        self.setWindowTitle('Password Attack Tool')
        self.show()

    def browseWordlist(self):
        file_dialog = QFileDialog(self)
        file_dialog.setFileMode(QFileDialog.ExistingFiles)
        file_dialog.setNameFilter("Text files (*.txt)")
        file_dialog.setViewMode(QFileDialog.List)
        if file_dialog.exec_():
            file_paths = file_dialog.selectedFiles()
            if file_paths:
                self.wordlistInput.setText(file_paths[0])

    def startAttack(self):
        target = self.targetInput.text()
        wordlist = self.wordlistInput.text()
        if not target or not wordlist:
            self.resultArea.append('Please provide both target and wordlist.')
            return

        self.resultArea.append('Starting attack...')
        self.resultArea.append(f'Target: {target}')
        self.resultArea.append(f'Wordlist: {wordlist}')
        self.resultArea.append('')

        # Call a function to perform the attack
        result = self.run_attack(target, wordlist)
        self.resultArea.append(result)

    def run_attack(self, target, wordlist):
        # Replace this with the actual attack logic, e.g., calling an external tool
        try:
            # Example of calling hydra for a simple HTTP POST attack
            result = subprocess.run(['hydra', '-L', wordlist, '-P', wordlist, target, 'http-post-form', '/login:username=^USER^&password=^PASS^:F=incorrect'],
                                    capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            return f'Error: {str(e)}'

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = PasswordTool()
    sys.exit(app.exec_())
