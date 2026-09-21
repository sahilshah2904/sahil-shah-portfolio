# Resume content and maintenance

## Source of truth

Use [Sahil_Shah_Resume.pdf](../Sahil_Shah_Resume.pdf) for personal facts, education, experience, skills, project results and awards. The [website plan](../WEBSITE_PLAN.md#page-and-content-plan) contains the extracted content map.

The Word document in the original workspace is untracked. It is an optional authoring file, not a required input for a fresh clone. `src/data/resume.ts` organises structured facts; `src/pages/index.astro` contains editorial copy and awards. Both must stay consistent with the current source resume and explicit owner corrections.

## Update procedure

1. Obtain the revised resume or explicit factual corrections from the owner.
2. Review changes to dates, employment, qualifications, project metrics and contact destinations.
3. Update the source PDF and the structured content. Preserve the source filename unless all references are updated together.
4. Run `npm run build`. Its asset preparation step refreshes `public/Sahil_Shah_Resume.pdf` from the source automatically.
5. Compare the two PDFs and verify the built website download opens the intended file.
6. Check all affected sections, metadata, links and print layout.
7. Record the update and validation in the project log, then commit the source and downloadable copy together with the content change.

Compare the files from the repository root in PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath Sahil_Shah_Resume.pdf
Get-FileHash -Algorithm SHA256 -LiteralPath public/Sahil_Shah_Resume.pdf
```

Matching hashes confirm identical bytes. Visual review is still needed to assess the resume itself.

## Editorial rules

- Preserve metric names: `0.964 macro AUROC` and `0.710 macro AUPRC` are not accuracy percentages.
- Keep the ECG evaluation context: 9,578 held-out records, distinct from the 63,851 records processed.
- Preserve the difference between professional experience, academic projects and foundational knowledge.
- Add repository/demo buttons only when real destinations are provided.
- Do not invent skill percentages, credentials, testimonials or clinical deployment claims.
- Keep all factual sections from the resume represented, even when the website changes their order.
- Confirm roles marked “Present” when publishing a revised resume.

## Outstanding content checks

The PDF prints `linkdin.com/in/sahil-shah-4094a7216`. The likely corrected destination is `https://www.linkedin.com/in/sahil-shah-4094a7216/`, but the profile still needs verification, so no LinkedIn button is published. Project-specific GitHub/demo links have not been supplied; the site links to the confirmed GitHub profile. Employment dates remain faithful to the supplied resume, including “Present”.

The public PDF contains contact details. If the owner later wants different public contact information, update both the page and downloadable resume together.
