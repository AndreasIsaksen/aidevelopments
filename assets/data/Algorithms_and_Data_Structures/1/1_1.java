import java.util.*;

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
