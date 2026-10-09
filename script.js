let completed = 0;

function makePlan() {
    const subject = document.getElementById("subject").value.trim();
    const hours = Number(document.getElementById("hours").value);
    const output = document.getElementById("plan");

    if (!subject || !Number.isInteger(hours) || hours < 1 || hours > 12) {
        output.textContent = "Enter a subject and 1–12 study hours.";
        return;
    }

    const tasks = [
        "Learn important concepts",
        "Study examples and practice",
        "Revise and test yourself"
    ];

    const parts = [0.5, 0.3, 0.2];

    output.textContent = `📚 Your ${subject} study plan\n\n` +
        tasks.map((task, i) =>
            `${i + 1}. ${task} — ${(hours * parts[i]).toFixed(1)} hour(s)`
        ).join("\n") +
        "\n\nTip: Take short breaks between sessions.";
}

function summarize() {
    const text = document.getElementById("notes").value.trim();
    const output = document.getElementById("summary");

    if (!text) {
        output.textContent = "Paste some notes first!";
        return;
    }

    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];

    if (sentences.length <= 2) {
        output.textContent = "Quick summary:\n" + text;
        return;
    }

    const count = Math.max(2, Math.ceil(sentences.length / 3));
    output.textContent = "Quick summary:\n" +
        sentences.slice(0, count).join(" ").trim() +
        "\n\nNote: This is a basic text-shortening demo, not an AI-generated summary.";
}

const quizzes = [
    {
        q: "Which language is used to style web pages?",
        a: ["HTML", "CSS", "SQL", "Python"],
        correct: 1
    },
    {
        q: "What does AI stand for?",
        a: ["Automatic Internet", "Artificial Intelligence",
            "Advanced Input", "Applied Interface"],
        correct: 1
    },
    {
        q: "Which data structure follows FIFO?",
        a: ["Stack", "Tree", "Queue", "Graph"],
        correct: 2
    },
    {
        q: "Which language makes web pages interactive?",
        a: ["JavaScript", "CSS", "XML", "SQL"],
        correct: 0
    },
    {
        q: "What does CPU stand for?",
        a: ["Central Processing Unit", "Computer Personal Utility",
            "Control Program User", "Central Power Unit"],
        correct: 0
    }
];

let currentQuiz;
let quizIndex = -1;
let answered = false;

function newQuiz() {
    quizIndex = (quizIndex + 1) % quizzes.length;
    currentQuiz = quizzes[quizIndex];
    answered = false;

    document.getElementById("question").textContent = currentQuiz.q;
    document.getElementById("feedback").textContent = "";

    const answers = document.getElementById("answers");
    answers.replaceChildren();

    currentQuiz.a.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;

        button.onclick = () => {
            if (answered) return;
            answered = true;

            document.querySelectorAll("#answers button")
                .forEach(btn => btn.disabled = true);

            if (index === currentQuiz.correct) {
                document.getElementById("feedback").textContent =
                    "✅ Correct! Great job.";
            } else {
                document.getElementById("feedback").textContent =
                    "💡 Correct answer: " +
                    currentQuiz.a[currentQuiz.correct];
            }
        };

        answers.appendChild(button);
    });
}

function completeTask() {
    completed++;
    document.getElementById("completed").textContent = completed;
    document.getElementById("message").textContent =
        "Amazing! You completed " + completed +
        " study session(s). Keep going! 🌟";
}

newQuiz();