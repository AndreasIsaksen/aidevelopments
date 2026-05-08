import java.util.Scanner;

public class Oppgave_1og3 {
    
    // Oppgave 1: Rekursiv metode for å beregne binomialkoeffisienten C(n, m)
    public static long C_rekursiv(int n, int m) {
        // Sjekker om n er mindre enn m, noe som ikke er gyldig
        if (n < m) {
            throw new IllegalArgumentException("n kan ikke være mindre enn m");
        } 
        // Basis-tilfeller: C(n, 0) = 1 og C(n, n) = 1
        else if (m == 0 || n == m) {
            return 1;
        } 
        // Rekursiv beregning basert på Pascals trekant-formelen
        else {
            long result = C_rekursiv(n - 1, m) + C_rekursiv(n - 1, m - 1);
            return result;
        }
    }

    // Oppgave 3: Metode som genererer én rad i Pascals trekant ved bruk av den rekursive metoden
    public static long[] PascalLine(int n) {
        long[] out = new long[n + 1]; // Array for å lagre rad n i Pascals trekant

        // Fyller ut rad n ved å kalle den rekursive metoden for hvert m
        for (int i = 0; i <= n; i++) {
            out[i] = C_rekursiv(n, i);
        }
        return out;
    }
    
    public static void main(String[] args) {
        Scanner S = new Scanner(System.in);
        int n, m, counter = 0; // Variabler for inndata og teller for utskrift
        String formattedString; // Brukes til formatert utskrift
        long[] PaLine; // Array for å lagre Pascals trekant-raden
        long T, T1, T2;

        // Ber brukeren om input for n og m
        System.out.print("n? ");
        n = S.nextInt();
        System.out.print("m? ");
        m = S.nextInt();
        S.close();
        
        // Måler tid for rekursiv beregning av C(n, m)
        T1 = System.currentTimeMillis();
        long rekursiv = C_rekursiv(n, m);
        T2 = System.currentTimeMillis();
        T = T2 - T1;

        // Skriver ut resultatet fra rekursiv beregning
        formattedString = String.format("'%d velg %d' gir: %d", n, m, rekursiv);
        System.out.println();
        System.out.println(formattedString);
        System.out.println(T + "ms");

        // Måler tid for generering av Pascals trekant-raden
        T1 = System.currentTimeMillis();
        PaLine = PascalLine(n);
        T2 = System.currentTimeMillis();
        T = T2 - T1;

        System.out.println();
        // Skriver ut hele raden for Pascals trekant med gitt n
        while (PaLine.length > counter) {
            formattedString = String.format("C(%d, %d) = %d", n, counter, PaLine[counter]);
            System.out.println(formattedString);
            counter++;
        }
        System.out.println(T + "ms");
    }
}
