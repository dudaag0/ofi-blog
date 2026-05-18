---
sidebar_custom_props:
  id: 1bcf4c74-6ecb-4d69-93d8-40edd173d77e
---
# :mdi-apple: Installation auf macOS
---

## Java installieren

Damit du Filius auf macOS starten kannst, muss du erst Java installieren:

::: details Java-Installation Schritt für Schritt

1. Wähle die richtige Version aus:

    1. Klicke auf das Apple Logo oben links:

        ![](./macos-version-1.png)

    2. Klicke auf "Über diesen Mac":

        ![](./macos-version-2.png)

    3. Steht unter dem Punkt "Prozessor" resp. "Chip" etwas mit "Apple M...":

        ![](./macos-version-3.png)

       verwende folgenden Link:

        * [:download: Java JDK 21.0.4 für macOS arm64 herunterladen][1]

       in allen anderen Fällen verwende folgenden Link:

        * [:download: Java JDK 21.0.4 für macOS x86_64 herunterladen][2]

2. Klicke hier auf __Fortfahren__:

    ![](./macos-java-install-1.png)

3. Klicke auf __Fortfahren__ und anschliessend auf __Akzeptieren__:

    ![](./macos-java-install-2.png)

4. Klicke auf __Installieren__:

    ![](./macos-java-install-3.png)

5. Bestätige die Installation mit deinem Fingerabdruck oder klicke auf __Passwort&nbsp;verwenden&nbsp;…__:

    ![](./macos-confirm-installation.png)

6. Klicke auf __Schliessen__, anschliessend auf __In&nbsp;den&nbsp;Papierkorb&nbsp;legen__:

    ![](./macos-java-install-4.png)

:::

## Filius installieren und ertmals starten

1. Lade die Filius DMG-Datei herunter (wenn mehrere Versionen verfügbar sind, nimmst du die aktuellste Version!):

* [:download: Filus 2.4.1 für macOS][3]

    ![](./macos-filius-install-0.png)

2. Öffne die Datei

    ![](./macos-filius-install-1.png)

3. Kopiere Filius zu Applikationen

    ![](./macos-filius-install-2.png)

4. Da Filius keine *signierte* Anwendung ist, ist der erste Start ein wenig umständlich. Beim ersten Start erscheint folgende Meldung:

    ![](./macos-filius-install-3.png)

5. Öffne die _Systemeinstellungen_, wähle _Sicherheit_ und dort das Tab _Allgemein_. Überprüfe, ob in der unteren Hälfte wirklich «filius.jar» steht und klicke dann auf _Dennoch öffnen_:

    ![](./macos-filius-install-4.svg)

6. Klicke auf _Öffnen_:

    ![](./macos-filius-install-5.png)

[1]: https://aka.ms/download-jdk/microsoft-jdk-21.0.4-macos-aarch64.pkg
[2]: https://aka.ms/download-jdk/microsoft-jdk-21.0.4-macos-x64.pkg
[3]: https://app.box.com/s/7pa38o97f32l6y32rzu4crqmsd5d0rid
