import customtkinter as ctk
import sqlite3
from tkinter import messagebox


def get_data():
    with sqlite3.connect("app.db") as db:
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS poems (id INTEGER PRIMARY KEY, poem TEXT NOT NULL)")
        try:
            cursor.execute("SELECT * FROM poems ORDER BY RANDOM() LIMIT 1")
        except:
            return {"id": 0, "poem": "Ошибка!"}
        return cursor.fetchone()


def update_poem():
    row_id = 0 if not label_id.cget("text") else label_id.cget("text")
    with sqlite3.connect("app.db") as db:
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute("SELECT COUNT(*) AS cnt  FROM poems")
        if cursor.fetchone()["cnt"] > 1:
            cursor.execute("SELECT * FROM poems WHERE id != ? ORDER BY RANDOM() LIMIT 1", (row_id,))
        else:
            cursor.execute("SELECT * FROM poems LIMIT 1")
        data_poem = cursor.fetchone()
        if data_poem:
            label_id.configure(text=data_poem["id"])
            textbox_1.delete("0.0", "end")
            textbox_1.insert("insert", data_poem["poem"])
        else:
            textbox_1.delete("0.0", "end")
            textbox_1.insert("insert", "Данных в базе данных нет...")


def get_one():
    return 1


def insert_poem():
    new_poem = textbox_2.get("0.0", "end").strip()
    if new_poem:
        with sqlite3.connect("app.db") as db:
            cursor = db.cursor()
            cursor.execute("INSERT INTO poems (poem) VALUES (?)", (new_poem,))
            db.commit()
            textbox_2.delete("0.0", "end")
            messagebox.showinfo("Готово", "Стихотворение добавлено в базу данных")
    else:
        messagebox.showwarning("Заполните поле", "Для добавления в базу данных стихотворения необходимо ввести его в соответствующее поле")


data = get_data()
# print (data["poem"])


ctk.set_appearance_mode("system")  # dark or light
ctk.set_default_color_theme("green")  # dark-blue, green

app = ctk.CTk()
app.title("Рубаи Омара Хайяма")
app.geometry("600x500+2000+300")
app.resizable(False, False)

# Tab
tabview = ctk.CTkTabview(master=app)
tabview.pack(pady=20, padx=50, fill="both", expand=True)
tab_1 = tabview.add("Случайное")
tab_2 = tabview.add("Добавить")

# Tab 1
label_id = ctk.CTkLabel(master=tab_1, text="")
label_id.pack()

textbox_1 = ctk.CTkTextbox(master=tab_1, width=450, height=300, wrap="word", spacing3=10)
textbox_1.pack()

if data:
    label_id.configure(text=data["id"])
    textbox_1.insert("0.0", data["poem"])

button_1 = ctk.CTkButton(master=tab_1, text="Обновить", command=update_poem)
button_1.pack(pady=20)

# Tab 2
textbox_2 = ctk.CTkTextbox(master=tab_2, width=450, height=300, wrap="word", spacing3=10)
textbox_2.pack(pady=20)

button_2 = ctk.CTkButton(master=tab_2, text="Сохранить", command=insert_poem)
button_2.pack(pady=20)

app.mainloop()
print(get_one)
