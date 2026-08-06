const codeSnippets = {
    Algorithms_and_Data_Structures: [
        {
            title: "Encryption with stack and queue",
            description: "Example code snippet demonstrating the use of stack and queue data structures to implement a simple encryption algorithm.",
            language: "Java",
            code: `import java.util.*;

public class Oblig_01 {

/* ************Metoder************* */

    // ROT13 kryptering som er hentet fra oppgaven
    private static String krypter(String S) {
        char[] C = S.toCharArray();
        for (int i = 0; i < S.length(); i++) {
            char c = C[i];
            if      (c >= 'a' && c <= 'm') c += 13;
            else if (c >= 'A' && c <= 'M') c += 13;
            else if (c >= 'n' && c <= 'z') c -= 13;
            else if (c >= 'N' && c <= 'Z') c -= 13;
            C[i] = c;
        }
        return String.valueOf(C);
    }

    //Metode for å dekryptere tilbake til original string.
    private static String dekrypter(String D) {
        //Lager en lokal Stack og kø for metoden
        Stack<Character> stack = new Stack<>();
        Queue<Character> queue = new LinkedList<>();
        //loop skiller ut tegn i mottat string med modulo løsning
        for (int i=0; i<D.length(); i++) {
            if (i%2==0) {
                stack.push(D.charAt(i));
            } else {
                queue.add(D.charAt(i));
            }
        }
        //Deklarerer en tom string til å motta data fra stack og kø
        String result = "";
        
        //loop fører data over fra kø til tom string
        while (!queue.isEmpty()) {
            result += queue.remove();
        }
        //loop bygger videre på overnevnte string med data fra stack
        while (!stack.isEmpty()) {
            result += stack.pop();
        }
        //Bruker ROT13 kryptering til å reversere krypteringen
        String end = krypter(result);
        return end;
    }

    //Metode for å lage en stack av siste halvdel til string
    private static Stack<Character> lagStack(String S) {
        //Deklarerer en lokal stack
        Stack<Character> stack = new Stack<>();
        //Loop starter halveis i stringen og pusher siste halvdel til stack
        for (int i=S.length()/2; i<S.length(); i++) {
            stack.push(S.charAt(i));
        }
        return stack;
    }

    //Metode for å lage en kø av første halvdel til string
    private static Queue<Character> lagQueue(String Q) {
        //Deklarerer en lokal kø
        Queue<Character> queue = new LinkedList<>();
        //Loop går fra start til halveis i string og pusher dette til kø
        for (int i=0; i<Q.length()/2; i++) {
            queue.add(Q.charAt(i));
        }
        return queue;
    }

    //Metode for å kombinere data fra stack og kø
    private static String komboStcOgQue(Stack<Character> stack, Queue<Character> queue) {
        //Deklarerer en tom string til å motta data fra stack og kø
        String kombo = "";
        //Loop fører over til string fra stack og kø sekvensielt
        while (!stack.isEmpty() && !queue.isEmpty()) {
            kombo += stack.pop();
            kombo += queue.remove();
        }
        //To ekstra looper under for å ta hensyn til stringer med oddetall antall karakterer
        while (!stack.isEmpty()) {
            kombo += stack.pop();
        }
        while (!queue.isEmpty()) {
            kombo += queue.remove();
        }
        return kombo;
    }

/* ************Kjøring av program************* */
    public static void main(String[] args) {

        //Deklarerer et scanner objekt for bruker input
        Scanner in = new Scanner(System.in);
        
        //Deklarerer et string objekt som skal holde på input
        String pw;

        //Prompt
        System.out.print("Skriv inn ditt passord: ");
        //Venter på input
        pw = in.nextLine();
        //Stenger scanner objekt
        in.close();
        
        //Bruker ROT13 metode til å kryptere input
        String kpw = krypter(pw);

        //To metoder deler opp string å leger en halvdel i kø og en i stack
        Stack<Character> stack = lagStack(kpw);
        Queue<Character> queue = lagQueue(kpw);

        //Data fra kø og stack kombineres til en endelig kryptert string
        String T = komboStcOgQue(stack, queue);


        System.out.println("Ukryptert:\t"+ pw);
        System.out.println("Kryptert:\t" + kpw);
        System.out.println("Stack og kø:\t" + T);
        //Metoden dekrypter() reverserer kryptert string tilbake til originalform
        System.out.println("Dekryptert:\t" + dekrypter(T));
    }
}
`
        },
        {
            title: "Algorithm analysis",
            description: "Example code snippet demonstrating the analysis of an algorithm's time complexity.",
            language: "Java",
            code: `import java.util.*;

public class Oblig_2 {
    public static void lineær(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            tmp *= 1;
    }

    public static void kvadratisk(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            for (long j = 0; j < n; j++)
                tmp *= 1;
    }

    public static int logaritmisk(long n)
    {
        int tmp = 1, iterasjoner = 0;
        for (long i = n; i > 0; i /= 2, iterasjoner++)
            tmp *= 1;
        return iterasjoner;
    }

// Oppgave 1 a) (Del 1)
// Opprettet metode for superlineær iterasjon
    public static void superlineær(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            for (long j = n; j > 0; j /= 2)
                tmp *= 1;
    }

// Oppgave 2 a) (Del 1)
// Oppretter metode for kubisk iterasjon
    public static void kubisk(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            for (long j = 0; j < n; j++)
                for (long k = 0; k < n; k++)
                    tmp *= 1;
    }

// Oppgave 3 a) (Del 1)
// Oppretter metode for eksponentiell iterasjon
    public static void eksponentiell(long n)
    {
        int tmp = 1;
        long iterasjoner = (long) Math.pow(2, n);
        for (long i = 0; i < iterasjoner; i++)
            tmp *= 1;
    }

// Oppgave 4 a) (Del 1)
// Oppretter metode for kombinatorisk iterasjon
    public static void kombinatorisk(long n)
    {
        int tmp = 1;
        long result = 1, counter = n;
        // Reger ut n!
        while (1 <= counter) {
            result *= counter;
            counter--;
        }
        // Itererer n! antall ganger
        for (long i = 0; i < result; i++) {
            tmp *= 1;
        }
    }

    public static void main(String[] args)
    {
        Scanner S = new Scanner(System.in);
        long n, T, T1, T2;
        int valg, iterasjoner = 0;

        System.out.print("1:O(n) 2:O(n²) 3:O(log_n) 4:O(n*log_n) 5:O(n³) 6:O(2^n) 7:O(n!) ? ");
        valg = S.nextInt();
        System.out.print("n? ");
        n = S.nextLong();

        T1 = System.currentTimeMillis();
        if (valg == 1)
            lineær(n);
        else if (valg == 2)
            kvadratisk(n);
        else if (valg == 3)
            iterasjoner = logaritmisk(n);
// Oppgave 1 a) (Del 2)
// Lagt til en if statement for valg av superlineær
        else if (valg == 4)
            superlineær(n);
// Oppgave 2 a) (Del 2)
// Lagt til en if statement for valg av kubisk
        else if (valg == 5) {
            kubisk(n);
        }
// Oppgave 3 a) (Del 2)
// Lagt til en if statement for valg av eksponentiell
        else if (valg == 6) {
            eksponentiell(n);
        }
// Oppgave 4 a) (Del 2)
// Lagt til en if statement for valg av kombinatorisk
        else if (valg == 7) {
            kombinatorisk(n);
        }
        T2 = System.currentTimeMillis();

        T = T2 - T1;
        System.out.print("T = " + T+ " ms");
        if (valg == 3)
            System.out.print(" (" + iterasjoner + ")");
        System.out.println();
    }
}
`
        },
        {
            title: "Recursion vs. iteration",
            description: "Example code snippet comparing recursive and iterative approaches to solving a problem.",
            language: "Java",
            code: `import java.util.Scanner;

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
`
        },
        {
            title: "Recursion vs. iteration II",
            description: "Continuation of the previous code snippet, comparing recursive and iterative approaches to solving a problem.",
            language: "Java",
            code: `import java.util.Scanner;

public class Oppgave_5og6 {

    // Oppgave 5: Iterativ metode for å beregne binomialkoeffisienten C(n, m)
    public static long C_iterativ(int n, int m) {

        // Sjekker om n er mindre enn m
        if (n < m) {
            throw new IllegalArgumentException("n kan ikke være mindre enn m");
        }

        // Lager en array for å lagre raden i Pascals trekant
        long[] PaLine = new long[m + 1];
        PaLine[0] = 1;  // C(n, 0) = 1

        // Itererer gjennom Pascals trekant opp til rad n
        for (int i = 1; i <= n; i++) {
            // Går baklengs gjennom arrayet for å oppdatere verdier basert på rekursjonsformelen
            for (int j = Math.min(i, m); j > 0; j--) {
                PaLine[j] = PaLine[j] + PaLine[j - 1];
            }
        }
        // Returnerer binomialkoeffisienten til C(n, m)
        return PaLine[m];
    }

    // Oppgave 6: Metode for å generere én rad av Pascals trekant
    public static long[] PascalLine(int n) {
        long[] out = new long[n + 1]; // Array for å lagre verdiene i Pascals trekant for rad n

        // Fyller ut rad n ved å beregne hver verdi med C_iterativ()
        for (int i = 0; i <= n; i++) {
            out[i] = C_iterativ(n, i);
        }
        return out;
    }

    public static void main(String[] args) {
        
        Scanner S = new Scanner(System.in);
        int n, m, counter = 0; // Variabler for input og teller for utskrift
        long result, T1, T2, T;
        long[] PaList; // Array for å lagre Pascals trekant-raden

        
        System.out.print("n? ");
        n = S.nextInt();
        System.out.print("m? ");
        m = S.nextInt();
        S.close();

        System.out.println();

        // Måler tid for å beregne C(n, m) iterativt
        T1 = System.currentTimeMillis();
        result = C_iterativ(n, m);
        T2 = System.currentTimeMillis();
        T = T2 - T1;

        // Skriver ut resultatet av C(n, m)
        System.out.println("'" + n + " velg " + m + "' gir " + result);
        System.out.println(T + "ms");

        System.out.println();

        // Måler tid for generering av Pascals trekant-raden
        T1 = System.currentTimeMillis();
        PaList = PascalLine(n);
        T2 = System.currentTimeMillis();
        T = T2 - T1;

        // Skriver ut hele Pascals trekant-raden for gitt n
        while (PaList.length > counter) {
            System.out.println("(" + n + " velg " + counter + ") = " + PaList[counter]);
            counter++;
        }
        System.out.println(T + "ms");
    }
}
`
        },
        {
            title: "Sorting - array vs. list",
            description: "Example code snippet comparing sorting an array and a list in Java.",
            language: "Java",
            code: `import java.util.*;

public class SortTest1 {

    public static void main(String[] args) {

        int n, iterator, max = 10000000;
        long tA, tL, t;

        Scanner S = new Scanner(System.in);

        System.out.print("n? ");
        n = S.nextInt();
        S.close();
        iterator = n;

        System.out.println("n\t\ttA\ttL\ttL/tA");
        System.out.println("--------------------------------------------");

        //Looper gjennom alle sorteringer
        while (n <= max) {

            // Lager en Array med tilfeldige verdier
            int A[] = new int[n];
            Random r = new Random();
            for (int i=0; i<n; i++) {
                A[i] = r.nextInt(2*n);
            }

            // Lager en kopi av A ved å legge til elementer på slutten av L
            LinkedList<Integer> L = new LinkedList<Integer>();
            for (int i = 0; i < n; i++) {
                L.addLast(Integer.valueOf(A[i]));
            }

            //Sorterer Array liste
            t = System.currentTimeMillis();
            Arrays.sort(A);
            tA = System.currentTimeMillis() - t;
            
            //Sorterer LinkedList
            t = System.currentTimeMillis();
            Collections.sort(L);
            tL = System.currentTimeMillis() - t;

            //if statement håndterer tabbing for utskrift.
            if (n < max) {
                System.out.printf("%d\t\t%-5d\t%-5d\t%-5.1f\n",
                                n, tA, tL, (float) tL / (float) tA);
            } else {
                System.out.printf("%d\t%-5d\t%-5d\t%-5.1f\n",
                                n, tA, tL, (float) tL / (float) tA);
            }
            n += iterator;
        }

        System.out.println("--------------------------------------------");

    }
}
`
        },
        {
            title: "Sorting - array vs. list II",
            description: "Continuation of the previous code snippet, further comparing sorting an array and a list in Java.",
            language: "Java",
            code: `import java.util.*;

public class SortTest2 {

    public static void main(String[] args) {

        int n, nDiv3, iterator, max;
        long tA, tL, t;

        Scanner S = new Scanner(System.in);

        while (true) {
            System.out.print("n? ");
            n = S.nextInt();
            System.out.print("max? ");
            max = S.nextInt();
            if (n>max){
                System.out.println("n must be smaller than max..");
                System.out.println("Try again.");
            } else {
                S.close();
                break;
            }

        }
        
        iterator = n;
        nDiv3 = n/3;

        System.out.println("n\t\ttA\ttL\ttL/tA");
        System.out.println("--------------------------------------------");

        //Looper gjennom alle sorteringer
        while (n <= max) {

            // Lager en Array med tilfeldige verdier
            int A[] = new int[n];
            int append, j = 0;
            Random r = new Random();
            for (int i=0; i<nDiv3; i++)
                A[i] = i;
            for (int i=nDiv3; i<nDiv3*2; i++)
                A[i] = r.nextInt(2*nDiv3);
            for (int i=nDiv3*2; i<nDiv3*3; i++) {
                append = nDiv3 + j;
                A[i] = append;
                j++;
            }
            
            // Lager en kopi av A ved å legge til elementer på slutten av L
            LinkedList<Integer> L = new LinkedList<Integer>();
            for (int i = 0; i < n; i++) {
                L.addLast(Integer.valueOf(A[i]));
            }

            //Sorterer Array liste
            t = System.currentTimeMillis();
            Arrays.sort(A);
            tA = System.currentTimeMillis() - t;
            
            //Sorterer LinkedList
            t = System.currentTimeMillis();
            Collections.sort(L);
            tL = System.currentTimeMillis() - t;

            //if statement håndterer tabbing for utskrift.
            if (n < max) {
                System.out.printf("%d\t\t%-5d\t%-5d\t%-5.1f\n",
                                n, tA, tL, (float) tL / (float) tA);
            } else {
                System.out.printf("%d\t%-5d\t%-5d\t%-5.1f\n",
                                n, tA, tL, (float) tL / (float) tA);
            }
            n += iterator;
        }

        System.out.println("--------------------------------------------");
    }
}
`
        },
        {
            title: "Binary trees and recursion",
            description: "Example code snippet demonstrating the use of binary trees and recursion in Java.",
            language: "Java",
            code: `import java.util.*;

class Trenode
{
    int verdi;
    Trenode venstre, høyre;
    int sum;
    Trenode forelder;
    
    public Trenode(int verdi, Trenode venstre, Trenode høyre)
    {
	this.verdi = verdi;
	this.venstre = venstre; this.høyre = høyre;
	sum = 0;
	forelder = null;
    }
}

public class Oblig_05
{
    // Oppgave 1
    static void settSum(Trenode rot)
    {
        // Deklarerer to variabler for å holde på verdier til
        // venste og høyre subtre
        int vV = 0, hV = 0;
        if (rot != null)
        {
            //Går rekursivt gjennom treet med 'Postorder'
            settSum(rot.venstre);
            settSum(rot.høyre);

            //Henter ut sum verdier fra noder i subtre
            // Bruker if-statement til å hente node verdi
            // Om node er null vil verdien bli satt til 0
            vV = (rot.venstre != null) ? rot.venstre.sum : 0;
            hV = (rot.høyre != null) ? rot.høyre.sum : 0;
            
            // summerer sum på subtrær med nodeverdi og legger de til i node sum
            rot.sum = rot.verdi + vV + hV;
        }
        
    }

    // Oppgave 2
    static void settForelder(Trenode rot)
    {
        //Bruker 'Preorder traversering' til å sette
        // forelder variabel til forelder klassen.
        if (rot != null)
        {
            //Går rekursivt til venstre
            if (rot.venstre != null)
            {
                rot.venstre.forelder = rot;
                settForelder(rot.venstre);
            }

            // Går rekursivt til høyre etter at venstre er ferdig
            if (rot.høyre != null)
            {
                rot.høyre.forelder = rot;
                settForelder(rot.høyre);
            }
        }
    }

    // Oppgave 3
    static void skrivUt(Trenode rot)
    {
        if (rot != null)
        {
            // Variabler som holder på verdier
            int v, s, f;
            // Unntaksvariabel for øvre rot
            char orphan = '*';
            // Lager kø for objekter
            Queue<Trenode> que = new LinkedList<Trenode>();
            que.add(rot);
            // Printer øvre linje
            System.out.println("Verdi\tSum\tForelder");
            // While loop kjører så lenge det er elementer i lista.
            while(!que.isEmpty())
            {
                // Tar ut et element fra køen
                Trenode thisTrenode = que.remove();
                // Om objekt ikke har forelder kjører denne
                if (thisTrenode.forelder == null)
                {
                    v = thisTrenode.verdi;
                    s = thisTrenode.sum;
                    System.out.printf("%d\t%d\t%c\n", v, s, orphan);
                    if ( thisTrenode.venstre != null)
                    que.add(thisTrenode.venstre);
                    if (thisTrenode.høyre != null)
                    que.add(thisTrenode.høyre);
                // Om objekt har forelder kjører denne
                }else
                {
                    v = thisTrenode.verdi;
                    s = thisTrenode.sum;
                    f = thisTrenode.forelder.verdi;
                    System.out.printf("%d\t%d\t%d\n", v, s, f);
                    if ( thisTrenode.venstre != null)
                        que.add(thisTrenode.venstre);
                    if (thisTrenode.høyre != null)
                        que.add(thisTrenode.høyre);
                }
            }
        }
    }

    // Testprogram
    public static void main(String args[])
    {
	Trenode rot =
            new Trenode(8,
                new Trenode(4,
                    new Trenode(2, null, null),
                    new Trenode(6, null, null)),
                new Trenode(16,
                    new Trenode(14,
                        new Trenode(12, null, null),
                        new Trenode(15, null, null)),
                    new Trenode(18, null,
                        new Trenode(20, null, null))));
	
	settSum(rot);
	settForelder(rot);
	skrivUt(rot);
    }
}
`
        },
        {
            title: "Text analysis with binary search tree. I (BST)",
            description: "Example code snippet demonstrating the use of a binary search tree (BST) for text analysis in Java.",
            language: "Java",
            code: `import java.io.*;
import java.util.Scanner;

// WordBST: Binært søketre med ord og ordfrekvenser
public class WordBST
{
    // WordNode: Indre klasse for en node i søketreet
    class WordNode
    {
	String ord;
	int frekvens;
	WordNode venstre, høyre;

	WordNode(String ord) {
		this.ord = ord;
		this.frekvens = 1;
		this.venstre = null;
		this.høyre = null;
	}

	void print() {
		System.out.println(ord + ": " + frekvens);
	}
    }
    
    private WordNode rot; // Roten i hele søketreet
    private int n;        // Antall noder i hele treet

    // WordBST(): Konstruktør som lager et tomt søketre
    public void WordBST()
    {
	rot = null;
	n = 0;
    }

    // size(): Antall ord som er lagret i treet
    public int size()
    {
	return n;
    }

    // insert(): Setter inn ny forekomst av et ord
    public void insert(String ord)
    {
		rot = insertRekursivt(rot, ord);
	}

// Rekursiv innsetting
private WordNode insertRekursivt(WordNode node, String ord) {
    // Basis-tilfelle: Hvis vi har nådd et nullpunkt i treet, sett inn ny node
    if (node == null) {
        n++; // Øk antall unike ord
        return new WordNode(ord);
    }

    // Hvis ordet allerede finnes, øk frekvensen
    if (ord.equals(node.ord)) {
        node.frekvens++;
    }
    // Hvis ordet er alfabetisk mindre, gå til venstre barn
    else if (ord.compareTo(node.ord) < 0) {
        node.venstre = insertRekursivt(node.venstre, ord);
    }
    // Hvis ordet er alfabetisk større, gå til høyre barn
    else {
        node.høyre = insertRekursivt(node.høyre, ord);
    }

    return node; // Returner den (mulig oppdaterte) noden
}

    // search(): Søk etter et ord. Skriv ut ordet og ordfrekvensen
    // hvis det finnes i søketreet.
	public void search(String ord) {
		WordNode current = rot; // Start søket fra roten
	
		while (current != null) {
			if (ord.equals(current.ord)) {
				// Hvis ordet er funnet, skriv det ut med frekvensen
				System.out.println(current.ord + ": " + current.frekvens);
				return; // Avslutt søket
			}
			// Gå til venstre subtre hvis ordet er mindre (alfabetisk)
			else if (ord.compareTo(current.ord) < 0) {
				current = current.venstre;
			}
			// Gå til høyre subtre hvis ordet er større (alfabetisk)
			else {
				current = current.høyre;
			}
		}
		// Hvis vi kommer hit, er ordet ikke i treet. Ingen utskrift.
	}
		
    // print(): Alfabetisk utskrift av hele søketreet. Kaller en
    // rekursiv metode som gjør selve utskriften.
    public void print()
    {
	print(rot);
    }

    // print(): Rekursiv utskrift av hele søketreet med rot i "rot"
    private void print(WordNode node)
    {
		if (node == null) {
			return; // Hvis noden er null, stopp rekursjonen.
		}
	
		print(node.venstre); // Gå til venstre subtre.
		node.print();        // Skriv ut ordet og frekvensen.
		print(node.høyre);   // Gå til høyre subtre.
	}
    
    // main(): Testprogram
    public static void main (String argv[])
    {
	// Leser filnavn fra bruker
	Scanner scan = new Scanner(System.in);
	System.out.print("File? ");
	String fileName = scan.next();

	// Oppretter ordleser og tomt søketre
	WordReader wR = new WordReader(fileName);
	WordBST wBST = new WordBST();

	// Leser alle ordene på filen og legger inn i treet
	String ord = wR.nextWord();
	while (ord != null)
	{
	    wBST.insert(ord);
	    ord = wR.nextWord();
	}
	// Skriver ut antall ulike ord som fantes i filen
	System.out.println(wBST.size() + " unique words " +
                    "read from file " + fileName);

	// Menyvalg for å teste programmet
	int valg = 0;
	while(valg != 3)
	{
	    System.out.print("\n1:Search, 2:Print, 3:Quit ? ");
	    valg = scan.nextInt();
	    if (valg == 1)
	    {
		System.out.print("Search for? ");
		ord = scan.next();
		wBST.search(ord.toLowerCase());
	    }
	    else if (valg == 2)
		wBST.print();
	}
    }
}
`
        },
        {
            title: "Text analysis with binary search tree. II (Reader)",
            description: "Continuation of the previous code snippet, demonstrating the use of a binary search tree (BST) for text analysis in Java, with a focus on the reader class.",
            language: "Java",
            code: `import java.io.*;
import java.util.Scanner;

// WordReader: Read a text file word-by-word
// Author: Jan Høiberg, 2024
// Note: All non-alphabetic characters are ignored

public class WordReader
{
    private BufferedReader reader; // Line-by-line file reader
    private String S[];            // All words on last read line
    private int numWords;          // Number of words on last line
    private int currentWord;       // Next word to be delievered
    private boolean finished;      // True if all words on file read

    // WordReader(): Constructor, opens file for reading
    public WordReader(String fileName)
    {
	currentWord = numWords = 0;
	finished = false;
	try {reader = new BufferedReader(new FileReader(fileName));}
	catch (IOException e) {e.printStackTrace();}
    }

    // nextWord(): Returns next word on file, null if all words read
    public String nextWord()
    {
	// Finished reading all words on file?
	if (finished)
	    return null;

	// If there are no more words left on the last line read from
	// file, then read a new line and split it into separate words
	if (currentWord == numWords)
	{
	    String line = "";
	    // Read new line from file, skip both blank/empty lines
	    // and lines with no alphabetical characters
	    while (line.length() == 0)
	    {
		// Try reading a line of text
		try {line = reader.readLine();}
		catch (IOException e) {e.printStackTrace();}
		// No more words on file?
		if (line == null)
		{
		    finished = true;
		    return null;
		}
		// Replace non-alphabetic characters with single space
		line = line.replaceAll("[^\\p{IsAlphabetic}]+", " ");
		// Trim off leading and trailing whitespace
		line = line.trim();
	    }
	    // Convert line to lowercase
	    line = line.toLowerCase();
	    // Split line into array of words
	    S = line.split(" ");
	    // Set number of words on line and the index of the next
	    // word to be returned from the method
	    numWords = S.length;
	    currentWord = 0;
	}
	// Return next word from last read line
	String word = S[currentWord];
	currentWord++;
	return word;
    }

    // main(): Test program, prints all words on a given file
    public static void main (String argv[])
    {
	Scanner scan = new Scanner(System.in);
	System.out.print("File? ");
	String fileName = scan.nextLine();

	WordReader wR = new WordReader(fileName);
	String word = wR.nextWord();
	while (word != null)
	{
	    System.out.println(word);
	    word = wR.nextWord();
	}
    }
}
`
        },
        {
            title: "Balanced search tree in Java I (TreeMap)",
            description: "Example code snippet demonstrating the implementation of a balanced search tree (TreeMap) in Java.",
            language: "Java",
            code: `import java.util.Scanner;
import java.util.TreeMap;
import java.util.Map;

// WordBST: Binært søketre med ord og ordfrekvenser
public class WordBST
{
	// Klasse variabel som holder på ord og frekvens
    private Map<String, Integer> wordMap;

	// Konstruktør for et TreeMap objekt
	public WordBST()
	{
		wordMap = new TreeMap<>();
	}

	// Metode som henter ut antall noder i treet.
    public int size()
	{
		return wordMap.size();
	}

    // insert(): Setter inn ny forekomst av et ord
    public void insert(String ord)
    {
		wordMap.put(ord, wordMap.getOrDefault(ord, 0) +1 );
	}

    // search(): Søk etter et ord. Skriv ut ordet og ordfrekvensen
    // hvis det finnes i søketreet.
	public void search(String ord)
	{
		Integer frekvens = wordMap.get(ord);
		if (frekvens != null)
		{
			System.out.println(ord + ": " + frekvens);
		}
	}
		
    // print(): Alfabetisk utskrift av hele søketreet. Kaller en
    // rekursiv metode som gjør selve utskriften.
    public void print()
    {
		for (Map.Entry<String, Integer> entry : wordMap.entrySet())
		{
			System.out.println(entry.getKey() + ": " + entry.getValue());
		}
    }

    // main(): Testprogram
    public static void main (String argv[])
    {
	// Leser filnavn fra bruker
	Scanner scan = new Scanner(System.in);
	System.out.print("File? ");
	String fileName = scan.next();

	// Oppretter ordleser og tomt søketre
	WordReader wR = new WordReader(fileName);
	WordBST wBST = new WordBST();

	// Leser alle ordene på filen og legger inn i treet
	String ord = wR.nextWord();
	while (ord != null)
	{
	    wBST.insert(ord);
	    ord = wR.nextWord();
	}
	// Skriver ut antall ulike ord som fantes i filen
	System.out.println(wBST.size() + " unique words " +
                    "read from file " + fileName);

	// Menyvalg for å teste programmet
	int valg = 0;
	while(valg != 3)
	{
	    System.out.print("\n1:Search, 2:Print, 3:Quit ? ");
	    valg = scan.nextInt();
	    if (valg == 1)
	    {
		System.out.print("Search for? ");
		ord = scan.next();
		wBST.search(ord.toLowerCase());
	    }
	    else if (valg == 2)
		wBST.print();
	}
    }
}
`
        },
        {
            title: "Balanced search tree in Java II (Reader)",
            description: "Continuation of the previous code snippet, demonstrating the implementation of a balanced search tree (TreeMap) in Java, with a focus on the reader class.",
            language: "Java",
            code: `import java.io.*;
import java.util.Scanner;

// WordReader: Read a text file word-by-word
// Author: Jan Høiberg, 2024
// Note: All non-alphabetic characters are ignored

public class WordReader
{
    private BufferedReader reader; // Line-by-line file reader
    private String S[];            // All words on last read line
    private int numWords;          // Number of words on last line
    private int currentWord;       // Next word to be delievered
    private boolean finished;      // True if all words on file read

    // WordReader(): Constructor, opens file for reading
    public WordReader(String fileName)
    {
	currentWord = numWords = 0;
	finished = false;
	try {reader = new BufferedReader(new FileReader(fileName));}
	catch (IOException e) {e.printStackTrace();}
    }

    // nextWord(): Returns next word on file, null if all words read
    public String nextWord()
    {
	// Finished reading all words on file?
	if (finished)
	    return null;

	// If there are no more words left on the last line read from
	// file, then read a new line and split it into separate words
	if (currentWord == numWords)
	{
	    String line = "";
	    // Read new line from file, skip both blank/empty lines
	    // and lines with no alphabetical characters
	    while (line.length() == 0)
	    {
		// Try reading a line of text
		try {line = reader.readLine();}
		catch (IOException e) {e.printStackTrace();}
		// No more words on file?
		if (line == null)
		{
		    finished = true;
		    return null;
		}
		// Replace non-alphabetic characters with single space
		line = line.replaceAll("[^\\p{IsAlphabetic}]+", " ");
		// Trim off leading and trailing whitespace
		line = line.trim();
	    }
	    // Convert line to lowercase
	    line = line.toLowerCase();
	    // Split line into array of words
	    S = line.split(" ");
	    // Set number of words on line and the index of the next
	    // word to be returned from the method
	    numWords = S.length;
	    currentWord = 0;
	}
	// Return next word from last read line
	String word = S[currentWord];
	currentWord++;
	return word;
    }

    // main(): Test program, prints all words on a given file
    public static void main (String argv[])
    {
	Scanner scan = new Scanner(System.in);
	System.out.print("File? ");
	String fileName = scan.nextLine();

	WordReader wR = new WordReader(fileName);
	String word = wR.nextWord();
	while (word != null)
	{
	    System.out.println(word);
	    word = wR.nextWord();
	}
    }
}
`
        },
        {
            title: "Heap-ordered binary trees (Node class)",
            description: "Example code snippet demonstrating the implementation of a node class for heap-ordered binary trees in Java.",
            language: "Java",
            code: `class Node
{
    int verdi;    // Heltallsverdi
    Node venstre; // Venstre barn
    Node høyre;   // Høyre barn

    // Konstruktør
    public Node(int data, Node v, Node h)
    {
	verdi = data;
	venstre = v;
	høyre = h;
    }
}
`
        },
        {
            title: "Heap-ordered binary trees (Tree Builder)",
            description: "Example code snippet demonstrating the implementation of a tree builder for heap-ordered binary trees in Java.",
            language: "Java",
            code: `import java.io.*;

public class OppgaveA
{
    // tell(): Returnerer antall forekomster av "verdi" i det
    // heap-ordnede treet med rot i "rot".
    public static int tell(Node rot, int verdi)
    {
      //Stopper når rekusjon er i bunn av en grein
      if (rot == null)
      return 0;
      
      //Stopper rekusjon på gren om verdi i parameter er høyere enn nodens verdi
      if (rot.verdi > verdi)
          return 0;

      //Når nodens verdi er lik verdi i parameter legger den på en og returnerer summeringen.
      int count = (rot.verdi == verdi) ? 1 : 0;
      return count + tell(rot.venstre, verdi) + tell(rot.høyre, verdi);
    }

    // main(): Testprogram
    public static void main(String argv[])
    {
	// Lager treet som er gitt i figur 1 i oppgaveteksten
	Node rot = new Node(1,
                      new Node(2,
                        new Node(17,
                          new Node(25, null, null),
                          new Node(19, null, null)),
                        null),
                      new Node(17, null,
                        new Node(36, null, null)));

	// Tester metoden tell() for noen verdier
	System.out.println("tell(2)  = " + tell(rot,2));
	System.out.println("tell(17) = " + tell(rot,17));
	System.out.println("tell(25) = " + tell(rot,25));
	System.out.println("tell(50) = " + tell(rot,50));
    }
}
`
        },
        {
            title: "Heap-ordered binary trees (Balanced Tree)",
            description: "Example code snippet demonstrating the implementation of a balanced tree in Java.",
            language: "Java",
            code: `import java.util.Queue;
import java.util.LinkedList;
import java.io.*;

public class OppgaveBC
{
    // Oppgave B
    public static void reparer(Node rot)
    {
		// Stopper om treet er tomt.
		if (rot == null) {
			return;
		}
		
		// lager en Node klasse som representerer gjeldende node.
		Node current = rot;
		
		// Kjører så lenge gjeldende Node har minst et barn.
		while (current.venstre != null || current.høyre != null) {
			Node minChild;
			
			// Finner barn med lavest verdi.
			if (current.venstre != null && current.høyre != null) {
				// Om det finnes to barn, så velges den minste.
				minChild = (current.venstre.verdi <= current.høyre.verdi) ? current.venstre : current.høyre;
			// Om det bare er et barn i venstre.
			} else if (current.venstre != null) {
				minChild = current.venstre;
			// Om det bare er et barn i høyre.
			} else {
				minChild = current.høyre;
			}
			
			//Sjekker om verdi for gjeldende node er mindre en barn
			// Stopper om barn verdi er større eller lik gjeldende node verdi.
			if (current.verdi <= minChild.verdi) {
				break;
			}
			
			// Bytter om på verdier om på noder, slik at forelder får den høyeste verdien.
			int temp = current.verdi;
			current.verdi = minChild.verdi;
			minChild.verdi = temp;
			
			// Bytter node til barn og repeterer prosessen.
			current = minChild;
		}
    }

    // Oppgave C
    public static void lagHeapOrdning(Node rot)
    {
		// Om treet er tomt, så gjør den ingenting.
		if (rot == null) {
			return;
		}
		
		// Først, rekursiv heap-order på venstre subtre.
		lagHeapOrdning(rot.venstre);
		
		// Så, rekursiv heap-order på høyre subtre.
		lagHeapOrdning(rot.høyre);
		
		// Kaller til slutt på reparer metode som gjør kontroll på verider i ny heap-order.
		reparer(rot);
    }

    // Nivå for nivå utskrift, for testing
    public static void print(Node rot)
    {
	if (rot == null)
		return;
	Queue<Node> q = new LinkedList<Node>();
	int n_nivå = 1, n_print = 0, n_neste = 0;
	q.add(rot);
	while (!q.isEmpty())
	{
		Node denne = q.remove();
		if (denne.venstre != null)
		{
		q.add(denne.venstre);
		n_neste++;
		}
		if (denne.høyre != null)
		{
		q.add(denne.høyre);
		n_neste++;
		}
		System.out.print(denne.verdi + " ");
		// Triks for å skrive ut hvert nivå på en egen linje
		if (++n_print == n_nivå)
		{
		System.out.println();
		n_print = 0;
		n_nivå = n_neste;
		n_neste = 0;
		}
	}
	if (n_print != 0)
		System.out.println();
	System.out.println();
    }
    
    // Testprogram
    public static void main(String argv[])
    {
	// Lager og og skriver ut treet i figur 3 i oppgaveteksten:
	Node rot = new Node(36,
						new Node(19,
							new Node(17,
								new Node(25, null, null),
								new Node(2, null, null)),
							new Node(7, null, null)),
						new Node(25,
							new Node(1, null, null),
							new Node(3, null, null)));
	print(rot);
	// Gjør om treet til et heap-ordnet tre og skriver ut
	lagHeapOrdning(rot);
	print(rot);
    }
}
`
        },
        {
            title: "Hash tables in Java (HashMap)",
            description: "Example code snippet demonstrating the implementation of a hash table using HashMap in Java.",
            language: "Java",
            code: `import java.util.HashMap;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Collections;

// Endret navnet på klassen.
public class WordHash
{
	// Instansisrer HashMap med en String key og int value
	private HashMap<String, Integer> map;

	// Konstruktør som oppretter et tomt HashMap
	public WordHash()
	{
		map = new HashMap<>();
	}

	// Metode reutrnerer antall unike ord
	public int size()
	{
		return map.size();
	}

	// Ordene brukes til Hash indeksering og får en tilhørende verdi(antall forekomster av ordet).
	// Om ordet ikke finnes får den en ny plass i listen med verdi==1
	// Om ordet finnes, vil key bli overskrevet og verdi frekvensen får en +1 verdi.
	public void insert(String ord)
	{
		if (map.containsKey(ord))
		{
			map.put(ord.toLowerCase(), map.get(ord) + 1);
		}
		else
		{
			map.put(ord.toLowerCase(), 1);
		}
	}

	// Bruker Hash verdien til å søke etter ordert i listen.
	// Om det er en match printes ut ordet og frekvensen.
	// Om key verdien ikke finnes i listen printes at ordet ikke finnes.
	public void search(String ord)
	{
		if (map.containsKey(ord))
		{
			System.out.println(ord + ": " + map.get(ord));
		}
		else
		{
			System.out.println("'" + ord + "' finnes ikke i listen");
		}
	}

	// Lager en liste av alle ord i listen.
	// Listen sorteres for å få en alfabetisk print.
	// for loop printer ut den nye listen med tilhørende frekvens av ordet.
	public void print()
	{
		List<String> keys = new ArrayList<>(map.keySet());
		Collections.sort(keys);
		for (String ord : keys)
		{
			System.out.println(ord + ": " + map.get(ord));
		}
	}

	// Liten ekstra løsning som printer ut en liste over hvilke filer som er tilgjengelige.
	public static void fileList()
	{
		String dirPath = "data/";
		File dir = new File(dirPath);
		File[] files = dir.listFiles();
		if (files != null)
		{
			for (File file : files)
			{
				String filename = file.getName();
				int dot = filename.lastIndexOf(".");
				if (dot > 0)
				{
					filename = filename.substring(0, dot);
				}
				System.out.println(filename);
			}
		}
	}



	// Main programmet.
	public static void main(String[] args)
	{
		// Spør om bruker ønsker en liste over tilgjengelige filer.
		// I dette tilfellet vil alle andre valg enn y bli tolket som n.
		Scanner scan = new Scanner(System.in);
		System.out.println("List files?(y/n) ");
		String fList = scan.next();
		if(fList.equals("y"))
		{
			fileList();
		}
		
		// Spør bruker om ønsket fil.
		// Gjorde en liten endring i WordReader, slik at filnavn skrives inn uten fil suffix.
		System.out.println("File name? ");
		String filename = scan.next();

		// Leser inn fil
		WordReader wR = new WordReader(filename);
		// Oppretter HashMap
		WordHash H = new WordHash();

		// Setter ord fra fil inn i HashMap
		String ord = wR.nextWord();
		while (ord != null)
		{
			H.insert(ord);
			ord = wR.nextWord();
		}

		// Skriver ut antallet unike ord fra filen.
		System.out.println(H.size() + " unique words read from file " + filename);

		// Meny er lik som før, bare med kall mot HashMap istedet.
		int valg = 0;
		while (valg != 3)
		{
			System.out.println("\n1: Search, 2: Print, 3: Quit ? ");
			valg = scan.nextInt();
			if (valg == 1)
			{
				System.out.print("Search for? ");
				ord = scan.next();
				H.search(ord.toLowerCase());
			}
			else if (valg == 2)
			{
				H.print();
			}
		}
		scan.close();
	}
}
`
        },
        {
            title: "Topological sorting of graphs",
            description: "Example code snippet demonstrating the implementation of topological sorting of graphs in Java.",
            language: "Java",
            code: `import java.io.*;
import java.util.*;

// Topologisk sortering

public class TopSort
{
    int n;            // Antall noder i grafen
    boolean nabo[][]; // Nabomatrise
    String data[];    // Data i hver node

    // TopSort(): Konstruktør
    // Leser inn grafen fra fil, ingen feilsjekking
    public TopSort(String filNavn)
    {
	// Filformat:
	//   ant.noder
	//   node# data ant.naboer nabo# nabo# ...
	//   node# data ant.naboer nabo# nabo# ...
	//   ...
	try
	{
	    // Åpner datafil for lesing
        Scanner in = new Scanner(new File(filNavn));
	    // Leser antall noder
        n = in.nextInt();
	    // Oppretter nabomatrisen
        nabo = new boolean[n][n];
	    // Setter hele nabomatrisen, untatt diagonalen, til false
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                nabo[i][j] = (i == j) ? true : false;
	    // Oppretter arrayen med data (string) for hver node
        data = new String[n];
	    // For hver node: Les data og alle naboene noden har
        for (int i = 0; i < n; i++)
        {
		int nodeNr = in.nextInt();
		data[nodeNr] = in.next();
		int antNaboer = in.nextInt();
		for (int j = 0; j < antNaboer; j++)
		{
			int naboNr = in.nextInt();
			nabo[nodeNr][naboNr] = true;
		}
        }
	}
        catch (Exception e)
	{
        System.err.println("Error reading file " + filNavn);
        System.exit(1);
	}
    }

    // findAndPrint(): Finner og skriver ut en topologisk sortering
    public void findAndPrint()
    {
        // Array lagrer verdi for hver node.
        int[] ingrad = new int[n];

        // Regner ingrad for hver node.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j && nabo[i][j]) {
                    ingrad[j]++;
                }
            }
        }

        // Lager en queue  og legger til alle noder med ingrad = 0.
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (ingrad[i] == 0) {
                queue.add(i);
            }
        }

        // Teller antallet noder som har blitt lest.
        int countVisited = 0;

        // Prosess kjører frem til alle noder med ingrad = 0 er beahndlet.
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(data[node] + " ");
            countVisited++;

            // Itererer gjennon alle nodene (med unntak av gjeldende node).
            // Reduserer ingrad verdi og legger den til i køen om ingrad på noden = 0.
            for (int j = 0; j < n; j++) {
                if (node != j && nabo[node][j]) {
                    ingrad[j]--;
                    if (ingrad[j] == 0) {
                        queue.add(j);
                    }
                }
            }
        }

        // Bruker node telleren til å kontrollere at graf ikke inneholder sykler.
        if (countVisited != n) {
            System.out.println("\nGrafen inneholder en sykel. Topologisk sortering er ikke mulig.");
        }
    }

    // main(); Testprogram
    public static void main(String args[])
    {
	Scanner scan = new Scanner(System.in);
	System.out.print("File? ");
	String filNavn = scan.next();

	new TopSort(filNavn).findAndPrint();
    }
}`
        }
    ]
}




function createCodeCard(codeItem) {
	const card = document.createElement("article");
	card.className = "code-card";

	const content = document.createElement("div");
	content.className = "code-card-content";

	const badge = document.createElement("span");
	badge.className = "code-language-badge";
	badge.textContent = codeItem.language || "code";

	const title = document.createElement("h3");
	title.textContent = codeItem.title;

	const description = document.createElement("p");
	description.textContent = codeItem.description;

	const preview = document.createElement("pre");
	preview.className = "code-card-preview";

	const previewCode = document.createElement("code");
	previewCode.textContent = getCodePreview(codeItem.code);

	preview.appendChild(previewCode);

	const openLabel = document.createElement("span");
	openLabel.className = "code-open-label";
	openLabel.textContent = "View snippet →";

	content.appendChild(badge);
	content.appendChild(title);

	if (codeItem.description) {
		content.appendChild(description);
	}

	content.appendChild(preview);
	content.appendChild(openLabel);

	card.appendChild(content);

	card.addEventListener("click", () => {
		openCodeViewer(codeItem, card);
	});
	card.tabIndex = 0;
	card.setAttribute("role", "button");
	card.setAttribute("aria-label", `Open ${codeItem.title}`);
	card.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			openCodeViewer(codeItem, card);
		}
	});

	return card;
}

function getCodePreview(code) {
	const maxLines = 6;
	const lines = code.split("\n");

	if (lines.length <= maxLines) {
		return code;
	}

	return lines.slice(0, maxLines).join("\n") + "\n...";
}

function openCodeViewer(codeItem, trigger = document.activeElement) {
	const viewerSection = document.getElementById("code-viewer-section");
	const viewer = document.getElementById("code-viewer");
	const viewerTitle = document.getElementById("code-viewer-title");
	const viewerDescription = document.getElementById("code-viewer-description");
	const viewerLanguage = document.getElementById("code-viewer-language");

	viewer.textContent = codeItem.code;
	viewerTitle.textContent = codeItem.title;

	if (viewerDescription) {
		viewerDescription.textContent = codeItem.description || "";
	}

	if (viewerLanguage) {
		viewerLanguage.textContent = codeItem.language || "code";
	}

	window.portfolioModal?.open(viewerSection, trigger);
}

function closeCodeViewer() {
	const viewerSection = document.getElementById("code-viewer-section");
	const viewer = document.getElementById("code-viewer");

	viewer.textContent = "";
	window.portfolioModal?.close(viewerSection);
}

function renderCodeGrid() {
	const grid = document.getElementById("code-grid");

	if (!grid) {
		return;
	}

	const courseKey = grid.dataset.course;
	const snippets = codeSnippets[courseKey] || [];

	if (snippets.length === 0) {
		grid.innerHTML = "<p>No code snippets have been added yet.</p>";
		return;
	}

	snippets.forEach(codeItem => {
		grid.appendChild(createCodeCard(codeItem));
	});
}

function copyCurrentCodeSnippet() {
	const viewer = document.getElementById("code-viewer");

	if (!viewer || !viewer.textContent) {
		return;
	}

	navigator.clipboard.writeText(viewer.textContent);
}

document.addEventListener("DOMContentLoaded", () => {
	renderCodeGrid();

	const closeButton = document.getElementById("close-code-viewer");

	if (closeButton) {
		closeButton.addEventListener("click", closeCodeViewer);
	}

    const copyButton = document.getElementById("copy-code-button");

    if (copyButton) {
        copyButton.addEventListener("click", copyCurrentCodeSnippet);
    }
});
