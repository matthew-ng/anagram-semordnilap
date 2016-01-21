$(document).ready(function() {

    // Semordnilap
    // We can approach semordnilap words/sentences as a long string with no spaces or special characters
    // 1. Remove spaces
    // 2. Convert to lower case
    // 3. Remove special characters such as ',",?,! etc..

    var removeSpaceChar = function(str) {
        return str.replace(/[^a-z]+/g,'').split(' ').join('');
    }

    // Reverse the string for comparison
    var reverseString = function(str) {
        return str.split('').reverse().join('');
    }

    // Anagram
    // Since anagrams have the same letters, we can split the array, sort it and compare the strings
    var compare = function(str) {
        return str.split('').sort().join('');
    }

    // Disable href for dictionary link
    $('.dictionary-chk').on('click', function(e) {
        e.preventDefault();
    });

    // Add event listener on both inputs
    $('.inputCompare').on('keyup',function() {
        // Convert to lowercase so all letters are in the same format
        inputA = $('#inputA').val().toLowerCase(),
        inputB = $('#inputB').val().toLowerCase();

        // Remove the spaces and characters
        var wordA = removeSpaceChar(inputA),
            wordB = removeSpaceChar(inputB);

            // Ensure that input is actually a valid word length
            if ( (inputA.length && inputB.length) >= 2 ) {
                // Show message container
                $('.message-container').removeClass('hide').addClass('show');

                // Dictionary search
                // For each dictionary link find the inputCompare sibling and parse value
                $('.dictionary-chk').each(function(index) {
                    var $dictionaryLink = $(this);
                    $(this).on('click', function(e) {
                        e.preventDefault();
                        goUrl = 'http://dictionary.reference.com/browse/' + $(this).siblings('.inputCompare').val();
                        window.open(goUrl);
                    });
                });

                // Check for anagram
                if (compare(wordA) == compare(wordB)) {
                    $('.anagram').removeClass('error').addClass('success');
                } else {
                    $('.anagram').removeClass('success').addClass('error');
                }

                // Check for semordnilap
                // Reverse the input from A and check against B
                if (reverseString(wordA) == wordB) {
                    $('.semordnilap').removeClass('error').addClass('success');
                } else {
                    $('.semordnilap').removeClass('success').addClass('error');
                }

            // Not a word
            } else {
                $('.message-container').removeClass('show').addClass('hide');
            }
      })
});
