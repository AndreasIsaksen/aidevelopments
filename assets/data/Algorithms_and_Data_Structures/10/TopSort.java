import java.io.*;
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
}