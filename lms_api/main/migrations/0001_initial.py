# Generated by Django 5.0 on 2023-12-19 08:02

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Participant",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("age", models.IntegerField()),
                ("enrolled_date", models.DateField(auto_now_add=True)),
                ("monthly_fee_paid", models.BooleanField(default=False)),
                (
                    "chosen_batch",
                    models.CharField(
                        choices=[
                            ("6-7AM", "6-7AM"),
                            ("7-8AM", "7-8AM"),
                            ("8-9AM", "8-9AM"),
                            ("5-6PM", "5-6PM"),
                        ],
                        max_length=10,
                    ),
                ),
            ],
        ),
    ]